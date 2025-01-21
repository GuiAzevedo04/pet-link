package com.petlink.controller;

import com.petlink.data.entity.Schedules;
import com.petlink.service.SchedulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("agendamentos")
public class SchedulesController {

    private final SchedulesService schedulesService;

    public SchedulesController(SchedulesService schedulesService) {
        this.schedulesService = schedulesService;
    }

    // GET ALL SCHEDULES
    @GetMapping
    public ResponseEntity<List<Schedules>> getAllSchedules() {
        List<Schedules> schedules = schedulesService.getAllSchedules();
        return ResponseEntity.ok(schedules);
    }

    // GET SCHEDULE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Schedules> getScheduleById(@PathVariable Long id) {
        return schedulesService.getSchedules(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST (ADD NEW SCHEDULE)
    @PostMapping
    public ResponseEntity<String> addSchedule(@RequestBody Schedules schedules) {
        schedulesService.addSchedules(schedules);
        return ResponseEntity.status(HttpStatus.CREATED).body("Schedule added successfully!");
    }

    // DELETE ALL SCHEDULES
    @DeleteMapping
    public ResponseEntity<String> deleteAllSchedules() {
        schedulesService.deleteAllSchedules();
        return ResponseEntity.ok("All schedules have been deleted!");
    }

    // DELETE SCHEDULE BY ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteScheduleById(@PathVariable Long id) {
        schedulesService.deleteById(id);
        return ResponseEntity.ok("Schedule with ID " + id + " has been deleted!");
    }

    // UPDATE SCHEDULE
    @PutMapping("/{id}")
    public ResponseEntity<String> updateSchedule(
            @PathVariable Long id,
            @RequestBody Schedules schedules) {
        try {
            schedulesService.updateSchedule(schedules, id);
            return ResponseEntity.ok("Schedule updated successfully!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}

