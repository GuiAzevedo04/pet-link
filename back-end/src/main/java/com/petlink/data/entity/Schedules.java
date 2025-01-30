package com.petlink.data.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Schedules")
public class Schedules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_schedules", updatable = false, nullable = false)
    private Long idSchedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private User user;

    @Column(nullable = false, name = "schedule_date")
    private LocalDate scheduleDate;

    @NotBlank
    @Column(nullable = false, name = "pet_name")
    private String petName;

    @Column(nullable = false, name = "time_of_schedule")
    private Time timeOfSchedule;

    @NotBlank
    @Column(nullable = false, name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "id_services")
    private Services services;


    @Column(name = "description")
    private String description;

}
