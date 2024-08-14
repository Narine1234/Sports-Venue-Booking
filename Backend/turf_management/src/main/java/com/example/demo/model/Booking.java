package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    

    @Column(name = "title", length = 255)
    private String title;// Added title field

    private String timeslot;
    private LocalDate date;
    private int numberOfMembers;
    private double bookingAmount;
    private LocalDateTime timestamp;

    // Default constructor
    public Booking() {
        super();
    }

    // Parameterized constructor
    public Booking(Long id, Turf turf, String title, String timeslot, LocalDate date, int numberOfMembers, double bookingAmount, LocalDateTime timestamp) {
        super();
        this.id = id;
        
        this.title = title; // Initialize title
        this.timeslot = timeslot;
        this.date = date;
        this.numberOfMembers = numberOfMembers;
        this.bookingAmount = bookingAmount;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() {	
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTimeslot() {
        return timeslot;
    }

    public void setTimeslot(String timeslot) {
        this.timeslot = timeslot;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getNumberOfMembers() {
        return numberOfMembers;
    }

    public void setNumberOfMembers(int numberOfMembers) {
        this.numberOfMembers = numberOfMembers;
    }

    public double getBookingAmount() {
        return bookingAmount;
    }

    public void setBookingAmount(double bookingAmount) {
        this.bookingAmount = bookingAmount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
