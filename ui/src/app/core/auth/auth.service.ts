import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { API } from '../api/banque';

export interface Utilisateur {
  readonly login: string;
  readonly roles: readonly string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly utilisateur = signal<Utilisateur | null>(null);

  private entete: string | null = null;
  enteteAuthorization(): string | null {
    return this.entete;
  }

  /**
   * Vérifie les identifiants auprès du serveur (GET /api/me avec l'en-tête
   * Basic) et mémorise l'utilisateur. Doit échouer (throw) si le serveur répond 401.
   */
  async connecter(login: string, motDePasse: string): Promise<void> {
    const entete = 'Basic ' + btoa(`${login}:${motDePasse}`);
    const utilisateur = await firstValueFrom(
      this.http.get<Utilisateur>(`${API}/me`, {
        headers: new HttpHeaders({ Authorization: entete }),
      }),
    );
    this.entete = entete;
    this.utilisateur.set(utilisateur);
  }

  deconnecter(): void {
    this.entete = null;
    this.utilisateur.set(null);
  }
}
