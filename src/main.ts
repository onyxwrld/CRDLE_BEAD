import './style.css'
import {getAll} from "./card/cardService"
import { card } from './card/card';
//https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json

const cards: card[] = [];

 async function init() {
    const cardTable = await getAll();
    for (const c of cardTable) {
        cards.push(new card(c.id, c.name, c.arena, c.type, c.elixir, c.rarity, c.description, c.guessed));
    }
    console.log(cards);
}
document.addEventListener('DOMContentLoaded', init)

