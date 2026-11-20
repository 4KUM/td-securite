package com.example.banque.virement;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VirementRepository extends JpaRepository<Virement, Long> {
    List<Virement> findByCompteId(Long compteId, Pageable pageable);
}
