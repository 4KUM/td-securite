package com.example.banque.utilisateur;

/** Stocké sans le préfixe « ROLE_ » : c'est Spring Security qui l'ajoute pour hasRole(). */
public enum Role {
    CLIENT,
    CONSEILLER
}
