package com.example.banque.virement;

import java.time.Instant;

public record VirementDto(Long id, Long compteId, String ibanDestinataire, long montant, Statut statut,
                          String validePar, Instant creeLe) {

    static VirementDto de(Virement virement) {
        return new VirementDto(virement.getId(), virement.getCompte().getId(), virement.getIbanDestinataire(),
                virement.getMontant(), virement.getStatut(), virement.getValidePar(), virement.getCreeLe());
    }
}
