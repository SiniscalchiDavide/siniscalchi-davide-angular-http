import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Pokemon, PokemonTypeResponse } from '../modelli/pokemon';
import { PokemonService } from '../services/pokemon';

@Component({
  selector: 'app-pokedex',
  imports: [],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css'
})
export class Pokedex implements OnInit {
  private readonly pokemonService = inject(PokemonService);

  readonly tipi = signal<{ name: string }[]>([]);
  readonly pokemon = signal<Pokemon | null>(null);
  readonly loading = signal(false);
  readonly errore = signal<string | null>(null);

  ngOnInit(): void {
    this.pokemonService.getTipi().subscribe({
      next: (res) => this.tipi.set(res.results),
      error: () => this.errore.set('Impossibile caricare i tipi.')
    });
  }

  cerca(query: string): void {
    if (!query) return;
    this.loading.set(true);
    this.errore.set(null);
    this.pokemon.set(null);

    this.pokemonService.getPokemon(query).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status === 404) {
          this.errore.set('Pokémon non trovato.');
        } else {
          this.errore.set(`Errore ${err.status}: impossibile recuperare i dati.`);
        }
      }
    });
  }
}