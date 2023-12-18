/**
 * card típus meghatározása. 
 */
export class card{
  /**
   * card típus elsődleges kulcsa az id.
   */
  id: number;
  /**
   * card típus neve.
   */
  name: string;
  /**
   * card típus változója mely meghatározza hanyadik arénától lehet elérni a kártyát.
   */
  arena: number;
  /**
   * változó, mely meghatározza a kártya típusát.
   */
  type: string;
  /**
   * változó, mely meghatározza a kártya értékét elixírben.
   */
  elixir: number;
  /**
   * változó, mely meghatározza a kártya ritkaságát.
   */
  rarity: string;
  /**
   * változó, mely meghatározza a kártya leírását.
   */
  description: string;
  /**
   * változó, mely meghatározza, hogy a felhasználó tippelt-e már a kártyára
   */
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
  