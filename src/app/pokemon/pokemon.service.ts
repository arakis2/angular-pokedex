import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {
  private pokemons: Pokemon[];

  constructor(private  httpClient: HttpClient) { }

  getPokemonList(): Observable<Pokemon[]>{
    return this.httpClient.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList: any) => this.log(pokemonList)),
      catchError((error) => this.handleError(error, []))
    )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined>{
    return this.httpClient.get(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon: any) => this.log(pokemon)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private log(response: any){
    console.table(response);
  }

  private handleError(error: Error, errorValue: []|any){
    console.error(error);
    return of(errorValue);
  }

  updatePokemon(pokemon: Pokemon): Pokemon|undefined{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.httpClient.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => {
        this.log(response);
        return pokemon;
      }),
      catchError((error) => this.handleError(error, undefined))
    );

    return undefined;
  }
}
