export class Pokemon {

  constructor()
  {
    this.name = 'Nom du pokémon',
    this.hp = 100,
    this.cp = 10,
    this.picture = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png',
    this.types = ['Normal'],
    this.created = new Date();
  }

    id: number|undefined;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: Array<string>;
    created: Date;
  }