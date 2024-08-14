package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Transient;
import java.util.Base64;

@Entity
public class Turf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image; 
    private String phone;
    private Double rating;
    private String services;
    
    private String title;
    private String ownerName;
    private String ownerPersonalNumber;
    private String license;
    private String openingTime; // New field
    @Column(name = "amount_per_hour")
    private Double amountPerHour;// New field for amount per hour
    private Integer maxMembersPerHour; // New field for maximum members allowed per hour

    
    @Transient
    private String imageBase64;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getOwnerPersonalNumber() {
        return ownerPersonalNumber;
    }

    public void setOwnerPersonalNumber(String ownerPersonalNumber) {
        this.ownerPersonalNumber = ownerPersonalNumber;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String openingTime) {
        this.openingTime = openingTime;
    }

    public Double getAmountPerHour() {
        return amountPerHour;
    }

    public void setAmountPerHour(Double amountPerHour) {
        this.amountPerHour = amountPerHour;
    }

    public Integer getMaxMembersPerHour() {
        return maxMembersPerHour;
    }

    public void setMaxMembersPerHour(Integer maxMembersPerHour) {
        this.maxMembersPerHour = maxMembersPerHour;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public void encodeImageToBase64() {
        if (this.image != null) {
            this.imageBase64 = Base64.getEncoder().encodeToString(this.image);
        } else {
            this.imageBase64 = null;
        }
    }

    public void decodeBase64ToImage(String base64String) {
        if (base64String != null && !base64String.isEmpty()) {
            this.image = Base64.getDecoder().decode(base64String);
        } else {
            this.image = null;
        }
    }

    @Override
    public String toString() {
        return "Turf{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", imageBase64='" + (imageBase64 != null ? imageBase64.substring(0, 10) + "..." : "null") + '\'' +
                ", phone='" + phone + '\'' +
                ", rating=" + rating +
                ", services='" + services + '\'' +
                ", title='" + title + '\'' +
                ", ownerName='" + ownerName + '\'' +
                ", ownerPersonalNumber='" + ownerPersonalNumber + '\'' +
                ", license='" + license + '\'' +
                ", openingTime='" + openingTime + '\'' +
                ", amountPerHour=" + amountPerHour + 
                ", maxMembersPerHour=" + maxMembersPerHour +
                '}';
    }
}
