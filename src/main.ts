import './style.css'
import {getAll} from "./card/cardService"
//https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json

 async function init() {
    const cardTable = await getAll();
    for (const iterator of cardTable) {
        console.log(iterator);
    }
}
document.addEventListener('DOMContentLoaded', init)

