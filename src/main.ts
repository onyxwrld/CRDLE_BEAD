import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import {getAll} from "./card/cardService";
import { card } from './card/card';
//https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json

const cards: card[] = [];
const randomCard: card[] = [];

async function init() {
    const cardTable = await getAll();
   for (const c of cardTable) {
        cards.push(new card(c.id, c.name, c.arena, c.type, c.elixir, c.rarity, c.description, c.guessed));
   }
   for (const c of cards) {
        c.guessed = false;
   }
    document.getElementById('gombID')?.addEventListener('click', getInputData);
    document.getElementById('descID')!.addEventListener('click', helpDesc);
    document.getElementById('arenaID')!.addEventListener('click', helpArena);
    document.getElementById('imgID')!.addEventListener('click', helpImg);
    RandomCard();
    console.log(randomCard);
    document.getElementById('inputID')!.addEventListener('input', changeInput);
    }

function changeInput(){
    const inputValue = (document.getElementById('inputID') as HTMLInputElement).value;
    filterNames(inputValue);
    }
function getInputData(){
    let inputData = document.getElementById('inputID') as HTMLInputElement;
    const a = inputData.value.toLowerCase();
    kiir(a);
    inputData.value = "";  
}

//Egy random Objectet kiválaszt
async function RandomCard() {
    const data = await getAll();
    let randomIndex = Math.floor((Math.random() * data.length));
    for (const c of data) {
        if(randomIndex == c.id){
            randomCard.push(c); 
        }
    }
    return true;
}
async function kiir(name:string)
{
    document.getElementById('theadID')!.style.visibility = 'visible';
    const a = document.getElementById('tbodyID') as HTMLInputElement;
    const data = await getAll();
    const DataTable = data.filter(x=>x.name.toLowerCase() === name.toLowerCase()).map((ab) =>{
        
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
        imgTag.src = `/images/cards/card${ab.id}.jpg`;
        nameCol.textContent = ab.name;
        arenaCol.textContent = ab.arena.toString();
        typeCol.textContent = ab.type;
        elixirCol.textContent = ab.elixir.toString();
        rarityCol.textContent = ab.rarity;
        descriptionCol.textContent = ab.description;
        tr.append(...[imageCol, nameCol, arenaCol, typeCol,elixirCol,rarityCol,]);
        return tr;
    });
    a.append(...DataTable);
}

function helpDesc()
 {
console.log(randomCard[0].description);
 }
 function helpArena()
 {
    console.log(randomCard[0].arena);
 }
 function helpImg()
 {
    console.log(true);
 }
 function autoFill(id: number)
 {
     for (const i of cards) {
         if(id == i.id)
         {
             (document.getElementById('inputID') as HTMLInputElement).value = i.name;
         }
     }
 }
  function renderNames(arrayOfNames: card[]) {
     const listContainer = document.getElementById("list-container") as HTMLUListElement;
     listContainer.textContent = '';
     for (const i of arrayOfNames) {
         const liElement = document.createElement("li");
         liElement.textContent = i.name;
         liElement.addEventListener('click', () => {
             autoFill(i.id);
         });
         listContainer.appendChild(liElement);
     }
     
  }
  function filterNames(event:string) {
     var searchvalue = event;
     var filterNames = cards.filter((v)=>{
         return(v.name.includes(searchvalue));
     })
     renderNames(filterNames);
  }
document.addEventListener('DOMContentLoaded', init)

