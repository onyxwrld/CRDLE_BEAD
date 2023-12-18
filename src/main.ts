import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import {getAll} from "./cardService";
import { card } from './card';
//https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json

/**
 * egy lista ami kártya objektumokat tárol el.
 */
export const cards: card[] = [];
/**
 * egy tömb ami a [0] indexén egy random kártyát tárol el.
 */
export const randomCard: card[] = [];

//let guessCounter: number = 0;
/**
 * inicializálja az alap komponenseket
 */
export async function init() {
    /**
     * cardTable nevű objektum, mely eltárolja az összes kártyát amit az adatbázisból lekértünk.
     */
    const cardTable = await getAll();
    /**
     * for ciklus, mely végig cardTable összes objektumán és hozzáadja egy cards nevű listához, miközben a guessed adattagot false értékre állítja.
     */
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
    document.getElementById('inputID')!.addEventListener('input', changeInput);
    /**
     * randomCard függvény meghívása.
     */
    RandomCard();
    /**
     * hibakeresés
     */
    console.log(randomCard);
    }

    /**
     * A függvény figyeli a bemeneti mező változását és meghívja a filterNames függvényt, melynek átadja inputValue értékét.
     */
export function changeInput(){
    const inputValue = (document.getElementById('inputID') as HTMLInputElement).value;
    filterNames(inputValue);
    }

/**
 * A függvény lekéri az input mező értékét es tovább adja a kiir függvénynek, majd a keresési listát határozza meg egy arrow function.
 */
export function getInputData(){
    //guessHelper;
    var x = document.getElementById("list-container")!;
    let inputData = (document.getElementById('inputID') as HTMLInputElement);
    kiir(inputData.value.toLowerCase());
    document.getElementById('inputID')!.addEventListener('keypress', () => {
        x.style.display = "block";
    })
    x.style.display = "none";
    inputData.value = "";  
}

/**
 * Sorsol egy random kártyát amit eltárol egy tömb [0] indexén.
 * @returns true.
 */
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

/**
 * Függvény, mely megjeleníti a táblázatot, majd összehasonlítja a tippelt kártyát a random kártyával ezután az összehasonlítás alapján megformázza a html oldalt.
 * @param name A felhasználó által tippelt kártya neve.
 */
export async function kiir(name:string)
{
    /**
     * Láthatóvá teszi a táblázat fejlécét.
     */
    document.getElementById('theadID')!.style.visibility = 'visible';

    /**
     * tableBody változó deklarálása és inicializálása.
     */
    const tableBody = document.getElementById('tbodyID') as HTMLTableRowElement;

    /**
     * lokális id változó deklarálása és inicializálása.
     */
    let id = 0;

    /**
     * DataTable objektum, mely a cards listát filtereli és a kártyák nevét lowerCase-li, majd kiválaszt egy objektumot a guess változóba, majd ezek alapján összehasonlítja a randomCard [0] objektumával és ez alapján formázza az oldalt.
     */
    const DataTable = cards.filter(x=>x.name.toLowerCase() === name.toLowerCase()).map((guess) =>{
        /**
         * A tippelt kártya guessed adattagját true-ra állítja.
         */
        guess.guessed = true;
        console.log(guess);
        /**
         * A korábban deklarált id változó megkapja a tippelt kártya id-ját értékül.
         */
        id = guess.id;
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
        imgTag.src = `/images/cards+/${guess.name}.png`;
        nameCol.textContent = guess.name;
        if(randomCard[0].name != guess.name)
        {
            imageCol.append(imgTag);
            imgTag.src = `/images/cards+/${guess.name}.png`;
            imageCol.classList.add("type");
            imageCol.classList.add("incorrect");
        }
        else{
            imageCol.append(imgTag);
            imgTag.src = `/images/cards+/${guess.name}.png`;
            imageCol.classList.add("type");
            imageCol.classList.add("correct");
        }
        if(randomCard[0].name != guess.name)
        {
            nameCol.classList.add("type");
            nameCol.classList.add("incorrect");
        }
        else{
            nameCol.classList.add("type");
            nameCol.classList.add("correct");
        }
        arenaCol.textContent = guess.arena.toString();
        if(randomCard[0].arena > guess.arena){
            arenaCol.classList.add("type");
            arenaCol.classList.add("up");
        }
        else if(randomCard[0].arena < guess.arena)
        {
            arenaCol.classList.add("type");
            arenaCol.classList.add("down");
        }
        else{
            arenaCol.classList.add("type");
            arenaCol.classList.add("correct");
        }
        typeCol.textContent = guess.type;
        if(randomCard[0].type != guess.type){
            typeCol.classList.add("type");
            typeCol.classList.add("incorrect");
        }
        else{
            typeCol.classList.add("type");
            typeCol.classList.add("correct");
        }
        elixirCol.textContent = guess.elixir.toString();
        if(randomCard[0].elixir > guess.elixir){
            elixirCol.classList.add("type");
            elixirCol.classList.add("up");
        }
        else if(randomCard[0].elixir < guess.elixir)
        {
            elixirCol.classList.add("type");
            elixirCol.classList.add("down");
        }
        else{
            elixirCol.classList.add("type");
            elixirCol.classList.add("correct");
        }
        rarityCol.textContent = guess.rarity;
        if(randomCard[0].rarity != guess.rarity)
        {
            rarityCol.classList.add("type");
            rarityCol.classList.add("incorrect");
        }
        else{
            rarityCol.classList.add("type");
            rarityCol.classList.add("correct");
        }
        descriptionCol.textContent = guess.description;
        tr.append(...[imageCol, nameCol, arenaCol, typeCol,elixirCol,rarityCol,]);
        return tr;
    });
    /**
     * A table-nek mindig a legfelső sorába töltse be az adatokat.
     */
    tableBody.insertBefore(DataTable[0],tableBody.firstChild);
    /**
     * Meghívja a winCheck függvényt és átadja neki az id változó értékét.
     */
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

/**
 * Az 1. helpImage, kattintáskor lefutó függvénye, mely a randomCard [0] leírását jeleníti meg.
 */
export function helpDesc()
 {
    //if (guessCounter >= 5){
        (document.getElementById("helpKep") as HTMLImageElement).src = "";
        document.getElementById("helpBekezdes")!.textContent = (randomCard[0].description);
        console.log(randomCard[0].description);
   // }
 }

/**
 * A 2. helpImage, kattintáskor lefutó függvénye, mely a randomCard [0] arénáját jeleníti meg.
 */
 export function helpArena()
 {
    //if(guessCounter >= 10){
        (document.getElementById("helpKep") as HTMLImageElement).src = "";
        document.getElementById("helpBekezdes")!.textContent = "A kártya a " + (randomCard[0].arena).toString() + ". arénában található.";
        console.log(randomCard[0].arena);
    //}
 }

/**
 * A 3. helpImage, kattintáskor lefutó függvénye, mely a randomCard [0] képét jeleníti meg.
 */
 export function helpImg()
 {
    //if(guessCounter >= 20){
        document.getElementById("helpBekezdes")!.textContent = null;
        (document.getElementById("helpKep") as HTMLImageElement).src = (`../images/cards+/${randomCard[0].name}.png`);
    //}
 }

/**
 * Kiválasztja a megkapott id alapján a cards listát és betölti az input mezőbe az értékét.
 * @param id amit a renderNames függvény ad át neki.
 */
 export function autoFill(id: number)
 {
     for (const c of cards) {
         if(id == c.id)
         {
             (document.getElementById('inputID') as HTMLInputElement).value = c.name;
         }
     }
 }

/**
 * A függvény kirendereli a listát, ami alapján be lehet tölteni a kereséső mezőt.
 * @param arrayOfCards A filterNames függvényből kapja meg a kártyák listáját.
 */
 export function renderNames(arrayOfCards: card[]) {
     const listContainer = document.getElementById("list-container") as HTMLUListElement;
     listContainer.textContent = '';
     for (const c of arrayOfCards) {
         const liElement = document.createElement("li");
         if(c.guessed != true){
         liElement.textContent = c.name;
         liElement.addEventListener('click', () => {
             autoFill(c.id);
         });
        }
         listContainer.appendChild(liElement);
     }
     
  }

/**
 * A cards listából kikeresi azt a kártyát, melynek a neve egyenlő a paraméter nevével, és objektumként átadja a renderNames függvénynek.
 * @param name Megkap egy stringet amiben a tippelt kártya neve van. 
 */
  export function filterNames(name: string) {
     let searchvalue = name.toLowerCase();
     let filterNames = cards.filter((v)=>{
            return(v.name.toLowerCase().includes(searchvalue));
        })
     renderNames(filterNames);
  }

/**
 * Ha a paraméterId megegyezik a randomCard[0].id-val akkor letiltja az input mezőt es a guess gombot.
 * @param id Paraméterként kap egy id-t.
 */
 export function winCheck(id: number) {
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

/**
 * Az index.html dokumentum betöltése után meghívja az init függvényt. 
 */
document.addEventListener('DOMContentLoaded', init)

