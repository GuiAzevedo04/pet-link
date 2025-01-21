package com.petlink.data.dto;

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
}
