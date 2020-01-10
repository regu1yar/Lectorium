package org.example.security;

import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import java.util.Collections;


@EnableWebSecurity
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
    public WebSecurityConfigurer() {
        super(true); // TODO: is this bad?
    }

    @Autowired
    UserRepository users;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .headers().and() // TODO: what's this?
                .securityContext().and()
                .exceptionHandling()
                    .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
                    .and()
                .authorizeRequests()
                    .anyRequest().authenticated()
                    .and()
                .formLogin() // TODO: be able to post credentials with json (why?)
                    .loginProcessingUrl("/api/login") // why not?
                    .permitAll()
                    .failureHandler((req, resp, exc) -> {
                        resp.setStatus(HttpStatus.UNAUTHORIZED.value());
                        resp.getWriter().flush();
                    })
                    .successHandler((req, resp, exc) -> {
                        resp.setStatus(HttpStatus.OK.value());
                        resp.getWriter().flush();
                    })
                    .and()
                .logout()
                    .logoutUrl("/api/logout")
                    .permitAll()
                    .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK))
                    .and()
                .cors();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username -> {
            org.example.model.User user = users
                    .findUserByName(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " not found"));
            return User.builder()
                    .username(user.getName())
                    .password(user.getPassword())
                    .authorities(Collections.emptyList())
                    .build();
        });
    }
}

