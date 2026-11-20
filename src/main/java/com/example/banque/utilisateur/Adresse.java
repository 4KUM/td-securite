package com.example.banque.utilisateur;

import jakarta.persistence.Embeddable;

@Embeddable
public class Adresse {
    private String rue;
    private String ville;
    private String codePostal;

    protected Adresse() {}

    public Adresse(String rue, String ville, String codePostal) {
        this.rue = rue;
        this.ville = ville;
        this.codePostal = codePostal;
    }

    public String getRue() { return rue; }
    public String getVille() { return ville; }
    public String getCodePostal() { return codePostal; }
}
