package com.petlink.controller;

import com.petlink.data.dto.SchedulesResponseDTO;
import com.petlink.data.entity.Schedules;
import com.petlink.data.entity.User;
import com.petlink.repository.SchedulesRepository;
import com.petlink.service.SchedulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/agendamentos")
public class SchedulesController {

    private final SchedulesService schedulesService;
    private final SchedulesRepository schedulesRepository;

    public SchedulesController(SchedulesService schedulesService,
                               SchedulesRepository schedulesRepository) {
        this.schedulesService = schedulesService;
        this.schedulesRepository = schedulesRepository;
    }

    // GET ALL SCHEDULES
    @GetMapping
    public ResponseEntity<List<Schedules>> getAllSchedules() {
        List<Schedules> schedules = schedulesService.getAllSchedules();
        return ResponseEntity.ok(schedules);
    }

    // GET SCHEDULE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Long id) {
        return ResponseEntity.ok().body(schedulesService.getSchedules(id));
    }

    // POST (ADD NEW SCHEDULE)
    @PostMapping
    public ResponseEntity<String> addSchedule(@RequestBody SchedulesResponseDTO schedulesDTO) {

        User userLogged = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        schedulesService.addSchedules(schedulesDTO, userLogged.getId_user());
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

    @GetMapping("/horarios-disponiveis")
    public ResponseEntity<?> getAvaliableTimes(@RequestParam("date") @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date){
        List<Time> horariosPossiveis = Arrays.asList(
                Time.valueOf("08:00:00"), Time.valueOf("09:00:00"),
                Time.valueOf("10:00:00"), Time.valueOf("11:00:00"),
                Time.valueOf("12:00:00"), Time.valueOf("13:00:00"),
                Time.valueOf("14:00:00"), Time.valueOf("15:00:00"),
                Time.valueOf("16:00:00"), Time.valueOf("17:00:00"),
                Time.valueOf("18:00:00")
        );

        List<Time> horariosDisponiveis = schedulesService.getAvaliableTimes(date, horariosPossiveis);

        return ResponseEntity.ok().body(Map.of("avaliableTimes",horariosDisponiveis));
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

