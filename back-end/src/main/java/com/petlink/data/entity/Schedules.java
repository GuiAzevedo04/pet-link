package com.petlink.data.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Data
@Entity
@Table(name="Schedules")
public class Schedules {

    @Id
    @SequenceGenerator(
            name = "schedules_sequence_generator",
            sequenceName = "schedules",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "schedules_sequence_generator"
    )
    @Column(name = "id_schedules", updatable = false, nullable = false)
    private Long idSchedule;

    @NotBlank
    @Column(nullable = false, name = "schedule_date")
    private Date scheduleDate;

    @NotBlank
    @Column(nullable = false, name = "pet_name")
    private String petName;

    @NotBlank
    @Column(nullable = false, name = "time_of_schedule")
    private Time timeOfSchedule;

    @NotBlank
    @Column(nullable = false, name = "status")
    private String status;

}
