package com.example.banque.virement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record NouveauVirement(@NotNull Long compteId, @NotBlank String ibanDestinataire, @Positive long montant) {}
