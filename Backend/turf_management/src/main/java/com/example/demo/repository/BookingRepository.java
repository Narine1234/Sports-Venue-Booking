package com.example.demo.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByDateAndTitle(LocalDate date, String title);
}
