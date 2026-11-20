package com.example.banque.config;

import com.example.banque.virement.Statut;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/** Les données de démo, lues dans application.yml (préfixe « demo »). */
@ConfigurationProperties("demo")
public record DemoProperties(List<AgenceConf> agences, List<ConseillerConf> conseillers, List<ClientConf> clients) {

    public record AgenceConf(String nom) {}

    public record ConseillerConf(String login, String motDePasse, String nom, String agence) {}

    public record ClientConf(String login, String motDePasse, String nom, AdresseConf adresse, List<CompteConf> comptes) {}

    public record AdresseConf(String rue, String ville, String codePostal) {}

    public record CompteConf(String numero, String agence, List<VirementConf> virements) {}

    public record VirementConf(String iban, long montant, Statut statut, String validePar) {}
}
