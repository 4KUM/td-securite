package com.example.banque.virement.in;

import com.example.banque.virement.NouveauVirement;
import com.example.banque.virement.VirementDto;
import com.example.banque.virement.VirementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/virements")
public class VirementController {

    private final VirementService virements;

    public VirementController(VirementService virements) {
        this.virements = virements;
    }

    @GetMapping
    public List<VirementDto> lister(@RequestParam("compte") Long compteId, @RequestParam(defaultValue = "0") int page) {
        return virements.lister(compteId, page);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VirementDto creer(@Valid @RequestBody NouveauVirement demande) {
        return virements.creer(demande);
    }

    /** Action métier : un conseiller valide, l'argent part et on garde qui l'a fait. */
    @PostMapping("/{id}/valider")
    public VirementDto valider(@PathVariable Long id) {
        return virements.valider(id);
    }
}
