import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonTypeResponse } from '../modelli/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);

  getTipi(): Observable<PokemonTypeResponse> {
    return this.http.get<PokemonTypeResponse>('https://pokeapi.co/api/v2/type');
  }

  getPokemon(nomeONumero: string): Observable<Pokemon> {
    const query = nomeONumero.toLowerCase().trim();
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${query}`);
  }
}