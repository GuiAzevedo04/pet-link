package com.petlink.service;

import com.petlink.data.entity.Schedules;
import com.petlink.repository.SchedulesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class SchedulesService {

    @Autowired
    private final SchedulesRepository schedulesRepository;

    public SchedulesService(SchedulesRepository schedulesRepository) {
        this.schedulesRepository = schedulesRepository;
    }

    //GET ALL
    public List<Schedules> getAllSchedules(){
        return schedulesRepository.findAll();
    }

    //GET BY ID
    public Optional<Schedules> getSchedules(@PathVariable Long id){
        return schedulesRepository.findById(id);
    }

    //POST
    public void addSchedules(Schedules schedules){
        schedulesRepository.save(schedules);
    }

    //DELETE ALL
    public void deleteAllSchedules(){
        schedulesRepository.deleteAll();
    }

    //DELETE BY ID
    public void deleteById(Long id){
        schedulesRepository.deleteById(id);
    }

    //UPDATE
    public void updateSchedule(Schedules schedules, Long id) {
        Optional<Schedules> existingSchedules = schedulesRepository.findById(id);
        if (existingSchedules.isPresent()) {
            Schedules updatedSchedule = existingSchedules.get();
            updatedSchedule.setScheduleDate(schedules.getScheduleDate());
            updatedSchedule.setPetName(schedules.getPetName());
            updatedSchedule.setTimeOfSchedule(schedules.getTimeOfSchedule());
            updatedSchedule.setStatus(schedules.getStatus());
            schedulesRepository.save(updatedSchedule);
        } else {
            throw new IllegalStateException("Schedule not found");
        }
    }

}
