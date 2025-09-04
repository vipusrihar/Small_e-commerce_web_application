package com.vipusa.securebackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS
                .cors(cors -> {})

                // Disable CSRF for API endpoints (React frontend handles CSRF differently)
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/api/**")
                )

                // Configure endpoint security
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/book/**").permitAll()  // Public
                        .requestMatchers("/api/orders/**").authenticated() // Orders require login
                        .anyRequest().authenticated()
                )

                // OAuth2 Login configuration
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5173/profile", true) // redirect frontend after login
                )

                // Logout configuration
                .logout(logout -> logout
                        .logoutSuccessUrl("http://localhost:5173") // redirect frontend after logout
                        .permitAll()
                );

        return http.build();
    }

    // CORS configuration for React frontend
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // frontend origin
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // important for cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
