package com.petlink.infra.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.security.Security;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/cliente/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/cliente/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/cliente/profile").authenticated()
                        .requestMatchers(HttpMethod.GET, "/agendamentos/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/agendamentos/").authenticated()
                        .requestMatchers(HttpMethod.GET, "/produto/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/produto/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/produto/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/produto/**").hasAnyRole("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/produto/").hasAnyRole("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.POST, "/carrinho/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/carrinho").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/services/").hasAnyRole("ADMIN", "EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/services").permitAll()
                        .requestMatchers(HttpMethod.POST, "/services/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/services/**").hasRole("ADMIN")
                        .anyRequest().permitAll())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
