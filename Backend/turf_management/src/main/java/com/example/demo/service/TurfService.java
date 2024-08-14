package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Turf;
import com.example.demo.repository.TurfRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TurfService {

    @Autowired
    private TurfRepository turfRepository;

    public Turf saveTurf(Turf turf) {
        return turfRepository.save(turf);
    }

    public List<Turf> getAllTurfs() {
        return turfRepository.findAll();
    }

    public Optional<Turf> getTurfById(Long id) {
        return turfRepository.findById(id);
    }

    public boolean existsById(Long id) {
        return turfRepository.existsById(id);
    }

    public void deleteTurf(Long id) {
        turfRepository.deleteById(id);
    }
}
