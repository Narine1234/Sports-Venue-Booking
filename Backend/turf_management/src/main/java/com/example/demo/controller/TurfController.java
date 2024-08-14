package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Turf;
import com.example.demo.repository.TurfRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turfs")
@CrossOrigin(origins = "http://localhost:3000")
public class TurfController {

    @Autowired
    private TurfRepository turfRepository;

    @GetMapping
    public List<Turf> getAllTurfs() {
        List<Turf> turfs = turfRepository.findAll();
        turfs.forEach(Turf::encodeImageToBase64);
        return turfs;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turf> getTurfById(@PathVariable Long id) {
        Optional<Turf> optionalTurf = turfRepository.findById(id);
        if (optionalTurf.isPresent()) {
            Turf turf = optionalTurf.get();
            turf.encodeImageToBase64();
            return ResponseEntity.ok(turf);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<Turf> createTurf(@RequestBody Turf turf) {
        Turf savedTurf = turfRepository.save(turf);
        savedTurf.encodeImageToBase64();
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTurf);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Turf> updateTurf(@PathVariable Long id, @RequestBody Turf turf) {
        if (!turfRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        turf.setId(id);
        Turf updatedTurf = turfRepository.save(turf);
        updatedTurf.encodeImageToBase64();
        return ResponseEntity.ok(updatedTurf);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTurf(@PathVariable Long id) {
        if (!turfRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        turfRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    
}
