package com.petlink.data.dto;

import com.petlink.data.entity.User;
import lombok.Data;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

@Data
public class SchedulesResponseDTO {
    private Long idSchedules;
    private LocalDate scheduleDate;
    private String petName;
    private Time timeOfSchedule;
    private String status;
    private Long serviceId;
    private String serviceName;
    private UserResponseDTO user;
    private String description;
}
