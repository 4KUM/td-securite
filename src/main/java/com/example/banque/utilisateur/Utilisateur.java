package com.example.banque.utilisateur;

import jakarta.persistence.*;

/** Ce qui sert à se connecter. Un Client et un Conseiller en contiennent un, ils n'en héritent pas. */
@Entity
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String login;

    /** Le hash BCrypt, jamais le mot de passe. */
    @Column(nullable = false)
    private String motDePasse;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    protected Utilisateur() {}

    public Utilisateur(String login, String motDePasse, Role role) {
        this.login = login;
        this.motDePasse = motDePasse;
        this.role = role;
    }

    public Long getId() { return id; }
    public String getLogin() { return login; }
    public String getMotDePasse() { return motDePasse; }
    public Role getRole() { return role; }
}
