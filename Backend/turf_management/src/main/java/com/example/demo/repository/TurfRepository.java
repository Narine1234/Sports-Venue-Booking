package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.model.Turf;

public interface TurfRepository extends JpaRepository<Turf, Long> {
    
    @Query("SELECT t FROM Turf t WHERE t.id = :id")
    Turf findTurfById(@Param("id") Long id);
}
