package com.example.banque.compte;

import com.example.banque.utilisateur.ConseillerRepository;
import com.example.banque.utilisateur.Role;
import com.example.banque.utilisateur.Utilisateur;
import com.example.banque.utilisateur.out.UtilisateurCourant;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
public class CompteService {

    private final CompteRepository comptes;
    private final UtilisateurCourant utilisateurCourant;
    private final ConseillerRepository conseillers;

    public CompteService(CompteRepository comptes, UtilisateurCourant utilisateurCourant, ConseillerRepository conseillers) {
        this.comptes = comptes;
        this.utilisateurCourant = utilisateurCourant;
        this.conseillers = conseillers;
    }

    public List<CompteDto> lister() {
        return comptes.findAll().stream().map(CompteDto::de).toList();
    }

    public CompteDto trouver(Long id) {
        Compte compte = comptes.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Compte " + id + " introuvable"));
        if (!peutVoir(compte)) {
            throw new AccessDeniedException("Pas le droit de voir le compte " + id);
        }
        return CompteDto.de(compte);
    }

    private boolean peutVoir(Compte compte) {
        Utilisateur utilisateur = utilisateurCourant.get().orElse(null);
        if (utilisateur == null) {
            return false;
        }
        if (utilisateur.getRole() == Role.CLIENT) {
            return compte.getTitulaire().getUtilisateur().getId().equals(utilisateur.getId());
        }
        return conseillers.findByUtilisateurLogin(utilisateur.getLogin())
                .map(conseiller -> conseiller.getAgence().getId().equals(compte.getAgence().getId()))
                .orElse(false);
    }
}
