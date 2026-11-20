package com.example.banque.utilisateur;

import jakarta.persistence.*;

@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    private Utilisateur utilisateur;

    private String nom;

    @Embedded
    private Adresse adresseResidence;

    protected Client() {}

    public Client(Utilisateur utilisateur, String nom, Adresse adresseResidence) {
        this.utilisateur = utilisateur;
        this.nom = nom;
        this.adresseResidence = adresseResidence;
    }

    public Long getId() { return id; }
    public Utilisateur getUtilisateur() { return utilisateur; }
    public String getNom() { return nom; }
    public Adresse getAdresseResidence() { return adresseResidence; }
}
