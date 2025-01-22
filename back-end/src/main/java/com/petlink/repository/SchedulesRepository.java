package com.petlink.repository;

import com.petlink.data.entity.Schedules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface SchedulesRepository extends JpaRepository<Schedules, Long> {

    @Query("SELECT s.timeOfSchedule FROM Schedules s WHERE s.scheduleDate = :date")
    List<Time> findByScheduleDate(@Param("date") LocalDate scheduleDate);

}
