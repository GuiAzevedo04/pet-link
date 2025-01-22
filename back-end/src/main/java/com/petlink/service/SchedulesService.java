package com.petlink.service;

import com.petlink.data.dto.SchedulesResponseDTO;
import com.petlink.data.dto.UserResponseDTO;
import com.petlink.data.entity.Schedules;
import com.petlink.data.entity.Services;
import com.petlink.data.entity.User;
import com.petlink.repository.SchedulesRepository;
import com.petlink.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SchedulesService {

    @Autowired
    private final SchedulesRepository schedulesRepository;

    @Autowired
    private final ServicesRepository servicesRepository;

    @Autowired
    private UserService userService;

    public SchedulesService(SchedulesRepository schedulesRepository, ServicesRepository servicesRepository) {
        this.schedulesRepository = schedulesRepository;
        this.servicesRepository = servicesRepository;
    }

    //GET ALL
    public List<SchedulesResponseDTO> getAllSchedules(){
        return schedulesRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    //GET BY ID
    public SchedulesResponseDTO getSchedules(Long id){
        return toDto(schedulesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found")));

    }

    //POST
    public void addSchedules(SchedulesResponseDTO scheduleDTO, Long user){
        Schedules newSchedule = new Schedules();
        newSchedule.setScheduleDate(scheduleDTO.getScheduleDate());
        newSchedule.setTimeOfSchedule(scheduleDTO.getTimeOfSchedule());
        newSchedule.setId_user(userService.getUserById(user));
        newSchedule.setPetName(scheduleDTO.getPetName());
        Services service = servicesRepository.findById(scheduleDTO.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found for id: " + scheduleDTO.getIdSchedules()));
        newSchedule.setServices(service);
        newSchedule.setStatus(scheduleDTO.getStatus());
        newSchedule.setDescription(scheduleDTO.getDescription());

        schedulesRepository.save(newSchedule);
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


    public List<Time> getAvaliableTimes(LocalDate date, List<Time> horariosPossiveis){

        List<Time> reservedTimes = schedulesRepository.findByScheduleDate(date);

        List<Time> horariosDisponiveis = horariosPossiveis.stream()
                .filter(time -> !reservedTimes.contains(time))
                .collect(Collectors.toList());

        return horariosDisponiveis;
    }

    private SchedulesResponseDTO toDto(Schedules entity) {
        SchedulesResponseDTO schedule = new SchedulesResponseDTO();
        schedule.setIdSchedules(entity.getIdSchedule());
        schedule.setScheduleDate(entity.getScheduleDate());
        schedule.setTimeOfSchedule(entity.getTimeOfSchedule());
        schedule.setPetName(entity.getPetName());
        schedule.setStatus(entity.getStatus());
        schedule.setServiceId(entity.getServices().getIdService());
        schedule.setDescription(entity.getDescription());
        UserResponseDTO user = new UserResponseDTO(entity.getId_user());

        schedule.setUser(user);

        return schedule;
    }

}
