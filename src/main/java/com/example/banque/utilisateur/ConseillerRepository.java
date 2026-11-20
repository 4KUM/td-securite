package com.example.banque.utilisateur;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConseillerRepository extends JpaRepository<Conseiller, Long> {
    Optional<Conseiller> findByUtilisateurLogin(String login);
}
