import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {getAll} from "./card/cardService";
import { card } from './card/card';
//https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json

const cards: card[] = [];
const randomCard = RandomCard();

async function init() {
    const cardTable = await getAll();
   for (const c of cardTable) {
        cards.push(new card(c.id, c.name, c.arena, c.type, c.elixir, c.rarity, c.description, c.guessed));
    }
    document.getElementById('gombID')?.addEventListener('click', getInputData);
}

function getInputData(){
    let inputData = document.getElementById('inputID') as HTMLInputElement;
    const a = inputData.value;
    kiir(a);
    inputData.value = "";
    
}
//Egy random Objectet kiválaszt
async function RandomCard() {
    const data = await getAll();
    let randomIndex = Math.floor((Math.random() * data.length) );
    return data[randomIndex];
}
async function kiir(name:string)
{
    const a = document.getElementById('tbodyID') as HTMLInputElement;
    const data = await getAll();
    const DataTable = data.filter(x=>x.name === name).map((ab) =>{
        const tr = document.createElement("tr");
        const nameCol = document.createElement("td");
        const arenaCol = document.createElement("td");
        const typeCol = document.createElement("td");
        const elixirCol = document.createElement("td");
        const rarityCol = document.createElement("td");
        const descriptionCol = document.createElement("td");
        nameCol.textContent = ab.name;
        arenaCol.textContent = ab.arena.toString();
        typeCol.textContent = ab.type;
        elixirCol.textContent = ab.elixir.toString();
        rarityCol.textContent = ab.rarity;
        descriptionCol.textContent = ab.description;
        tr.append(...[nameCol, arenaCol, typeCol,elixirCol,rarityCol,descriptionCol]);
        return tr;
    });
    a.append(...DataTable);
}
function helpDesc()
 {
console.log(true);
 }
 function helpArena()
 {
    console.log(true);
 }
 function helpImg()
 {
    console.log(true);
 }
document.addEventListener('DOMContentLoaded', init)

