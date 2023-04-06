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

  // testValentin() :string[]{
  //   var pokemonList: Pokemon[];
  //   this.getPokemonList().subscribe((pokemons) => pokemonList = pokemons);
  //   return [...new Set(pokemonList?.flatMap(p => p.types))]
  // }

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

  updatePokemon(pokemon: Pokemon): Observable<null>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.httpClient.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => {
        this.log(response);
      }),
      catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemon(pokemonId: number): Observable<null>{
    return this.httpClient.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon: any) => this.log(pokemon)),
      catchError((error) => this.handleError(error, []))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.httpClient.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => {
        this.log(response);
      }),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]>{
    return this.httpClient.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => {
        this.log(response);
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  

}
