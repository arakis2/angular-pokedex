import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemon-list';

@Injectable()
export class PokemonService {

  constructor() { }

  getPokemonList():Pokemon[]{
    return POKEMONS;
  }

  getPokemonById(pokemonId: number):Pokemon|undefined{
    return POKEMONS.find(p => p.id == pokemonId);
  }

  getPokemonTypeList(): string[]{
    return [...new Set(POKEMONS.flatMap(p => p.types))];
  }
}
