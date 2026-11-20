import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

/** L'API Spring, sur un autre port : c'est ce qui rend le CORS nécessaire. */
export const API = 'http://localhost:8080/api';

export interface Compte {
  readonly id: number;
  readonly numero: string;
  readonly agence: string;
  readonly titulaire: string;
}

export type Statut = 'EN_ATTENTE' | 'VALIDE';

export interface Virement {
  readonly id: number;
  readonly compteId: number;
  readonly ibanDestinataire: string;
  /** En centimes. */
  readonly montant: number;
  readonly statut: Statut;
  readonly validePar: string | null;
  readonly creeLe: string;
}

export interface NouveauVirement {
  readonly compteId: number;
  readonly ibanDestinataire: string;
  readonly montant: number;
}

/** Tous les appels à l'API de la banque. Rien d'autre dans l'appli ne parle HTTP. */
@Injectable({ providedIn: 'root' })
export class Banque {
  private readonly http = inject(HttpClient);

  comptes(): Promise<Compte[]> {
    return firstValueFrom(this.http.get<Compte[]>(`${API}/comptes`));
  }

  compte(id: number): Promise<Compte> {
    return firstValueFrom(this.http.get<Compte>(`${API}/comptes/${id}`));
  }

  virements(compteId: number): Promise<Virement[]> {
    return firstValueFrom(this.http.get<Virement[]>(`${API}/virements`, { params: { compte: compteId } }));
  }

  creerVirement(virement: NouveauVirement): Promise<Virement> {
    return firstValueFrom(this.http.post<Virement>(`${API}/virements`, virement));
  }

  validerVirement(id: number): Promise<Virement> {
    return firstValueFrom(this.http.post<Virement>(`${API}/virements/${id}/valider`, null));
  }
}
