package com.example.banque.compte;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AgenceRepository extends JpaRepository<Agence, Long> {
    Optional<Agence> findByNom(String nom);
}
