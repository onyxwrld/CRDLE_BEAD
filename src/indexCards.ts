import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import {getAll} from "./cardService";
import { card } from './card';

export const cards: card[] = [];

/**
 * inicializálja a komponenseket és meghívja a CreateTable függvényt.
 */
export async function init(){
    /**
     * cardTable nevű objektum, mely eltárolja az összes kártyát amit az adatbázisból lekértünk.
     */
    const cardTable = await getAll();
    /**
     * for ciklus, mely végig cardTable összes objektumán és hozzáadja egy cards nevű listához, miközben a guessed adattagot false értékre állítja.
     */
   for (const c of cardTable) {
        cards.push(new card(c.id, c.name, c.arena, c.type, c.elixir, c.rarity, c.description, c.guessed));
   }
   createTable();
}

export function createTable(){
    
    document.getElementById('tableHeadID')!.style.visibility = 'visible';
    const tableBody = document.getElementById('tableID') as HTMLTableRowElement;

    for (const card of cards) {
        console.log(card);    
        const tr = document.createElement("tr");
        const imageCol = document.createElement("td");
        const nameCol = document.createElement("td");
        const arenaCol = document.createElement("td");
        const typeCol = document.createElement("td");
        const elixirCol = document.createElement("td");
        const rarityCol = document.createElement("td");
        const descriptionCol = document.createElement("td");
        const imgTag = document.createElement("img");
        imageCol.append(imgTag);
        imgTag.src = `/images/cards+/${card.name}.png`;
        nameCol.textContent = card.name;
        arenaCol.textContent = card.arena.toString();
        typeCol.textContent = card.arena.toString();
        elixirCol.textContent = card.elixir.toString();
        rarityCol.textContent = card.rarity;
        descriptionCol.textContent = card.description;
        tr.append(...[imageCol, nameCol, arenaCol, typeCol,elixirCol,rarityCol,]);
        tableBody.append(tr);
    }

}

document.addEventListener('DOMContentLoaded', init);