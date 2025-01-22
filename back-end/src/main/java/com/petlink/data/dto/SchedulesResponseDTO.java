package com.petlink.data.dto;

import com.petlink.data.entity.User;
import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class SchedulesResponseDTO {
    private Long idSchedules;
    private Date scheduleDate;
    private String petName;
    private Time timeOfSchedule;
    private String status;
    private Long serviceId;
    private UserResponseDTO user;
}
