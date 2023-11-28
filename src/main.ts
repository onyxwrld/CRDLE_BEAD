import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {getAll} from "./card/cardService";
import { card } from './card/card';
//https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json

const cards: card[] = [];

async function init() {
    const cardTable = await getAll();
   /* for (const c of cardTable) {
        cards.push(new card(c.id, c.name, c.arena, c.type, c.elixir, c.rarity, c.description, c.guessed));
    }
    console.log(cards);*/
    document.getElementById('gombID')?.addEventListener('click', getInputData);
}

function getInputData(){const inputData = (document.getElementById('inputUD') as HTMLInputElement).value;
    kiir(inputData);
    
}
async function kiir(name:string)
{
    const a = document.getElementById('tbodyID') as HTMLInputElement;
    const data = await getAll();
    const DataTable = data.filter(x=>x.name === name).map((ab) =>{
        const tr = document.createElement("tr");
        const idCol = document.createElement("td");
        const nameCol = document.createElement("td");
        const arenaCol = document.createElement("td");
        const typeCol = document.createElement("td");
        const elixirCol = document.createElement("td");
        const rarityCol = document.createElement("td");
        const descriptionCol = document.createElement("td");
        const guessedCol = document.createElement("td");
        idCol.textContent = ab.id.toString();
        nameCol.textContent = ab.name;
        arenaCol.textContent = ab.arena.toString();
        typeCol.textContent = ab.type;
        elixirCol.textContent = ab.elixir.toString();
        rarityCol.textContent = ab.rarity;
        descriptionCol.textContent = ab.description;
        tr.append(...[idCol, nameCol, arenaCol, typeCol,elixirCol,rarityCol,descriptionCol]);
        return tr;
    });
    a.append(...DataTable);
}
document.addEventListener('DOMContentLoaded', init)

