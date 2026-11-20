package com.example.banque.virement;

import com.example.banque.compte.Compte;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class Virement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Compte compte;

    @Column(nullable = false)
    private String ibanDestinataire;

    /** En centimes, pour éviter les flottants. */
    private long montant;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Statut statut = Statut.EN_ATTENTE;

    /** Le login de celui qui l'a validé. */
    private String validePar;

    private Instant creeLe = Instant.now();

    protected Virement() {}

    public Virement(Compte compte, String ibanDestinataire, long montant) {
        this.compte = compte;
        this.ibanDestinataire = ibanDestinataire;
        this.montant = montant;
    }

    public void valider(String login) {
        if (statut == Statut.VALIDE) {
            throw new IllegalStateException("Le virement " + id + " est déjà validé");
        }
        this.statut = Statut.VALIDE;
        this.validePar = login;
    }

    public Long getId() { return id; }
    public Compte getCompte() { return compte; }
    public String getIbanDestinataire() { return ibanDestinataire; }
    public long getMontant() { return montant; }
    public Statut getStatut() { return statut; }
    public String getValidePar() { return validePar; }
    public Instant getCreeLe() { return creeLe; }
}
