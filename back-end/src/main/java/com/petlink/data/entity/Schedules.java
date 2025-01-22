package com.petlink.data.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
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

    @NotBlank
    @Column(nullable = false, name = "schedule_date")
    private Date scheduleDate;

    @NotBlank
    @Column(nullable = false, name = "pet_name")
    private String petName;

    @Column(nullable = false, name = "time_of_schedule")
    private Time timeOfSchedule;

    @NotBlank
    @Column(nullable = false, name = "status")
    private String status;

}
