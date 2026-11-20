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

  private login?: string;
  private password?: string;

  async connecter(login: string, motDePasse: string): Promise<void> {
    const utilisateur = await firstValueFrom(
      this.http.get<Utilisateur>(`${API}/me`, {
        headers: new HttpHeaders({ Authorization: 'Basic ' + btoa(login + ':' + motDePasse) }),
      }),
    );
    this.login = login;
    this.password = motDePasse;
    this.utilisateur.set(utilisateur);
  }

  basic(): string | undefined {
    if(this.login && this.password) {
      return this.login + ":" + this.password;
    }
    return undefined;
  }

  deconnecter(): void {
    this.login = undefined;
    this.password = undefined;
    this.utilisateur.set(null);
  }
}
