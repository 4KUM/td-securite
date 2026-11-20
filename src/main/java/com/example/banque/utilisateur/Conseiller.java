package com.example.banque.utilisateur;

import com.example.banque.compte.Agence;
import jakarta.persistence.*;

@Entity
public class Conseiller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private Utilisateur utilisateur;

    private String nom;

    @ManyToOne(optional = false)
    private Agence agence;

    protected Conseiller() {}

    public Conseiller(Utilisateur utilisateur, String nom, Agence agence) {
        this.utilisateur = utilisateur;
        this.nom = nom;
        this.agence = agence;
    }

    public Long getId() { return id; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public String getNom() { return nom; }
    public Agence getAgence() { return agence; }
}
