package org.example.security;

import org.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;


@EnableWebSecurity
public class WebSecurityConfigurer extends WebSecurityConfigurerAdapter {
    public WebSecurityConfigurer() {
        super(true); // TODO: this is bad?
    }

    @Autowired
    UserRepository users;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .headers().and() // TODO: what's this?
                .anonymous().and()
                .securityContext().and()
                .exceptionHandling().and()
                .authorizeRequests(req -> req.anyRequest().authenticated())
                .httpBasic();
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

