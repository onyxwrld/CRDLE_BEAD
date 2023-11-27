export class card{
  id: number;
  name: string;
  arena: number;
  type: string;
  elixir: number;
  rarity: string;
  description: string;
  guessed: boolean;
    constructor(
      id: number,
      name: string,
      arena: number,
      type: string,
      elixir: number,
      rarity: string,
      description: string,
      guessed: boolean,
    ){
      this.id = id;
      this.name = name;
      this.arena = arena;
      this.type = type;
      this.elixir = elixir;
      this.rarity = rarity;
      this.description = description;
      this.guessed = guessed;
    }
  }
  