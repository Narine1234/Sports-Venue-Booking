package com.example.demo.controller;

import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // POST mapping to add a new booking
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingRepository.save(booking);
        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    // GET mapping to retrieve all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // GET mapping to retrieve a booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    
    @GetMapping("/slots")
    public ResponseEntity<Map<String, List<String>>> getBookedSlots(
            @RequestParam("date") String date, 
            @RequestParam("title") String title) {
        
        // Find bookings by date and title
        List<Booking> bookings = bookingRepository.findByDateAndTitle(LocalDate.parse(date), title);
        Map<String, List<String>> response = new HashMap<>();
        List<String> bookedSlots = new ArrayList<>();

        // Collect booked slots for the given date and title
        for (Booking booking : bookings) {
            bookedSlots.addAll(Arrays.asList(booking.getTimeslot().split(", ")));
        }

        response.put("bookedSlots", bookedSlots);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
