package com.petlink.controller;

import com.petlink.data.entity.Services;
import com.petlink.service.ServicesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServicesController {

    private final ServicesService servicesService;

    public ServicesController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }

    // GET ALL SERVICES
    @GetMapping
    public ResponseEntity<List<Services>> getAllServices() {
        List<Services> services = servicesService.getAllServices();
        return ResponseEntity.ok(services);
    }

    // GET SERVICE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Services> getServiceById(@PathVariable Long id) {
        return servicesService.getServices(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST (ADD NEW SERVICE)
    @PostMapping
    public ResponseEntity<String> addService(@RequestBody Services service) {
        servicesService.addServices(service);
        return ResponseEntity.status(201).body("Service added successfully!");
    }

    // DELETE ALL SERVICES
    @DeleteMapping
    public ResponseEntity<String> deleteAllServices() {
        servicesService.deleteAllServices();
        return ResponseEntity.ok("All services have been deleted!");
    }

    // DELETE SERVICE BY ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteServiceById(@PathVariable Long id) {
        servicesService.deleteById(id);
        return ResponseEntity.ok("Service with ID " + id + " has been deleted!");
    }

    // UPDATE SERVICE
    @PutMapping("/{id}")
    public ResponseEntity<String> updateService(
            @PathVariable Long id,
            @RequestBody Services service) {
        try {
            servicesService.updateService(service, id);
            return ResponseEntity.ok("Service updated successfully!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
