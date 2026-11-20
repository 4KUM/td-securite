package com.example.banque.utilisateur.in;

import com.example.banque.utilisateur.Utilisateur;
import com.example.banque.utilisateur.out.UtilisateurCourant;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/** Qui suis-je ? Le front s'en sert pour vérifier des identifiants et connaître les rôles. */
@RestController
@RequestMapping("/api/me")
public class MeController {

    public record MeDto(String login, List<String> roles) {}

    private final UtilisateurCourant utilisateurCourant;

    public MeController(UtilisateurCourant utilisateurCourant) {
        this.utilisateurCourant = utilisateurCourant;
    }

    @GetMapping
    public MeDto me() {
        Utilisateur utilisateur = utilisateurCourant.get()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        return new MeDto(utilisateur.getLogin(), List.of(utilisateur.getRole().name()));
    }
}
