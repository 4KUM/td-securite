package com.example.banque.compte;

import com.example.banque.utilisateur.Client;
import jakarta.persistence.*;

@Entity
public class Compte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numero;

    @ManyToOne(optional = false)
    private Agence agence;

    @ManyToOne(optional = false)
    private Client titulaire;

    protected Compte() {}

    public Compte(String numero, Agence agence, Client titulaire) {
        this.numero = numero;
        this.agence = agence;
        this.titulaire = titulaire;
    }

    public Long getId() { return id; }
    public String getNumero() { return numero; }
    public Agence getAgence() { return agence; }
    public Client getTitulaire() { return titulaire; }
}
