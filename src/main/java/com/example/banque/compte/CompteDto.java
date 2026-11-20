package com.example.banque.compte;

public record CompteDto(Long id, String numero, String agence, String titulaire) {

    static CompteDto de(Compte compte) {
        return new CompteDto(compte.getId(), compte.getNumero(), compte.getAgence().getNom(), compte.getTitulaire().getNom());
    }
}
