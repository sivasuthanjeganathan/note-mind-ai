package com.notemind.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/*
    HealthController

    Purpose:
    This controller provides a simple test endpoint to check whether
    the Spring Boot backend is running correctly.

    Endpoint:
    GET /api/health

    Expected response:
    {
        "status": "UP",
        "service": "NoteMind AI Backend"
    }
*/
@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> healthCheck() {

        return Map.of(
                "status", "UP",
                "service", "NoteMind AI Backend");
    }
}