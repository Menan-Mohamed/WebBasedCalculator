package com.calc.calculatorb;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Ccnfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/evaluate")
                        .allowedOrigins("http://localhost:5173") // Allow your React app's origin
                        .allowedMethods("POST", "GET") // Allow the appropriate methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true); // Optional: if you need to send credentials (cookies, authorization headers)
            }
        };
    }
}
