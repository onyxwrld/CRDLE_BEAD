import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import {getAll} from "./card/cardService";
import { card } from './card/card';
//https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json

//egy tömb ami kártya objektumokat tárol el.
const cards: card[] = [];
//egy tömb ami a [0] indexén egy random kártyát tárol el.
const randomCard: card[] = [];

let guessCounter: number = 0;

async function init() {
    const cardTable = await getAll();
   for (const c of cardTable) {
        c.guessed = false;
        cards.push(new card(c.id, c.name, c.arena, c.type, c.elixir, c.rarity, c.description, c.guessed));
   }
    document.getElementById('gombID')!.addEventListener('click', getInputData);
    //document.getElementById('descID')!.setAttribute('disabled', '');
    document.getElementById('descID')!.addEventListener('click', helpDesc);
    //document.getElementById('arenaID')!.setAttribute('disabled', '');
    document.getElementById('arenaID')!.addEventListener('click', helpArena);
    //document.getElementById('imgID')!.setAttribute('disabled', '');
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
    //guessHelper;
    var x = document.getElementById("list-container")!;
    let inputData = document.getElementById('inputID') as HTMLInputElement;
    const a = inputData.value.toLowerCase();
    kiir(a);
    document.getElementById('inputID')?.addEventListener('keypress', () => {
        x.style.display = "block";
    })
    x.style.display = "none";
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
    const tableBody = document.getElementById('tbodyID') as HTMLTableRowElement;
    let id = 0;
    const DataTable = cards.filter(x=>x.name.toLowerCase() === name.toLowerCase()).map((ab) =>{
        ab.guessed = true;
        console.log(ab);
        id = ab.id;
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
        imgTag.src = `/images/cards+/${ab.name}.png`;
        nameCol.textContent = ab.name;
        if(randomCard[0].name != ab.name)
        {
            nameCol.classList.add("type");
            nameCol.classList.add("incorrect");
        }
        else{
            typeCol.classList.add("type");
            typeCol.classList.add("correct");
        }
        arenaCol.textContent = ab.arena.toString();
        if(randomCard[0].arena > ab.arena){
            arenaCol.classList.add("type");
            arenaCol.classList.add("up");
        }
        else if(randomCard[0].arena < ab.arena)
        {
            arenaCol.classList.add("type");
            arenaCol.classList.add("down");
        }
        else{
            arenaCol.classList.add("type");
            arenaCol.classList.add("correct");
        }
        typeCol.textContent = ab.type;
        if(randomCard[0].type != ab.type){
            typeCol.classList.add("type");
            typeCol.classList.add("incorrect");
        }
        else{
            typeCol.classList.add("type");
            typeCol.classList.add("correct");
        }
        elixirCol.textContent = ab.elixir.toString();
        if(randomCard[0].elixir > ab.elixir){
            elixirCol.classList.add("type");
            elixirCol.classList.add("up");
        }
        else if(randomCard[0].elixir < ab.elixir)
        {
            elixirCol.classList.add("type");
            elixirCol.classList.add("down");
        }
        else{
            elixirCol.classList.add("type");
            elixirCol.classList.add("correct");
        }
        rarityCol.textContent = ab.rarity;
        if(randomCard[0].rarity != ab.rarity)
        {
            rarityCol.classList.add("type");
            rarityCol.classList.add("incorrect");
        }
        else{
            rarityCol.classList.add("type");
            rarityCol.classList.add("correct");
        }
        descriptionCol.textContent = ab.description;
        tr.append(...[imageCol, nameCol, arenaCol, typeCol,elixirCol,rarityCol,]);
        return tr;
    });
    tableBody.insertBefore(DataTable[0],tableBody.firstChild);
    winCheck(id);
}

/*function guessHelper(){
    guessCounter++;
    if(guessCounter >= 5){
        document.getElementById('descID')!.removeAttribute("disabled");
        document.getElementById('descID')!.addEventListener('click', helpDesc);
    }
    if(guessCounter >= 10)
    {
        document.getElementById('arenaID')!.removeAttribute("disabled");
        document.getElementById('arenaID')!.addEventListener('click', helpArena);
    }
    if(guessCounter >= 20)
    {
        document.getElementById('imgID')!.removeAttribute("disabled");
        document.getElementById('imgID')!.addEventListener('click', helpImg);
    }
}*/
function helpDesc()
 {
    //if (guessCounter >= 5){
        (document.getElementById("helpKep") as HTMLImageElement).src = "";
        document.getElementById("helpBekezdes")!.textContent = (randomCard[0].description);
        console.log(randomCard[0].description);
   // }
 }
 function helpArena()
 {
    //if(guessCounter >= 10){
        (document.getElementById("helpKep") as HTMLImageElement).src = "";
        document.getElementById("helpBekezdes")!.textContent = "A kártya a " + (randomCard[0].arena).toString() + ". arénában található.";
        console.log(randomCard[0].arena);
    //}
 }
 function helpImg()
 {
    //if(guessCounter >= 20){
        document.getElementById("helpBekezdes")!.textContent = null;
        (document.getElementById("helpKep") as HTMLImageElement).src = (`../images/cards+/${randomCard[0].name}.png`);
    //}
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
         if(i.guessed != true){
         liElement.textContent = i.name;
         liElement.addEventListener('click', () => {
             autoFill(i.id);
         });
        }
         listContainer.appendChild(liElement);
     }
     
  }
  function filterNames(event:string) {
     var searchvalue = event.toLowerCase();
     var filterNames = cards.filter((v)=>{
            return(v.name.toLowerCase().includes(searchvalue));
        })
     renderNames(filterNames);
  }

  function winCheck(id: number) {
    if(id == randomCard[0].id){
        console.log("U WINNER!");
        (document.getElementById("helpKep") as HTMLImageElement).src = (`../images/cards+/${randomCard[0].name}.png`);
        document.getElementById("helpBekezdes")!.textContent = "A mai kártyát sikeresen kitaláltad!";
        document.getElementById('gombID')!.setAttribute('disabled', '');
        document.getElementById('inputID')!.setAttribute('disabled', '');
        document.getElementById('descID')!.setAttribute('disabled', '');
        document.getElementById('arenaID')!.setAttribute('disabled', '');
        document.getElementById('imgID')!.setAttribute('disabled', '');
    }
}
/*function gameMechanic(todaysCard: card,selectedCard: card)
{
    if(todaysCard.arena > selectedCard.arena){

    }
}*/
document.addEventListener('DOMContentLoaded', init)

