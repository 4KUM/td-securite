import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Banque, Compte } from '../../core/api/banque';

@Component({
  selector: 'app-liste-comptes',
  imports: [RouterLink, MatCardModule, MatTableModule, MatProgressBarModule],
  templateUrl: './liste-comptes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeComptes implements OnInit {
  private readonly banque = inject(Banque);

  protected readonly colonnes = ['numero', 'titulaire', 'agence'];
  protected readonly comptes = signal<Compte[] | null>(null);
  protected readonly erreur = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      this.comptes.set(await this.banque.comptes());
    } catch {
      this.erreur.set('Impossible de charger les comptes.');
    }
  }
}
