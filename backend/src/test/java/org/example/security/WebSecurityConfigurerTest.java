package org.example.security;

import org.example.model.User;
import org.example.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class WebSecurityTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    UserRepository users;

    @BeforeEach
    void createUser() {
        users.save(User.builder().name("testuser").password("{noop}testpass").build());
    }

    @Test
    void testProtectedRoute() throws Exception {
        mvc
                .perform(get("/api/users"))
                .andExpect(status().isForbidden());
    }

    @Test
    void testInvalidLogin() throws Exception {
        MvcResult result = mvc
                .perform(
                        post("/api/login")
                        .param("username", "testuser")
                        .param("password", "fakepass")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isUnauthorized())
                .andReturn();

        mvc
                .perform(get("/api/users").session((MockHttpSession)result.getRequest().getSession()))
                .andExpect(status().isForbidden());
    }

    @Test
    void testValidLogin() throws Exception {
        MvcResult result = mvc
                .perform(
                        post("/api/login")
                                .param("username", "testuser")
                                .param("password", "testpass")
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk())
                .andReturn();

        mvc
                .perform(get("/api/users").session((MockHttpSession)result.getRequest().getSession()))
                .andExpect(status().isOk());
    }
}