/**
 * @module cardService
 */
import {card} from "./card.ts";
/**
 * url nevű változó, mely eltárolja a globálisan futó firebase adatbázis url-ét.
 */
export const url = "https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json";

/**
 * async függvény, mely véghez viszi az adatbáziskapcsolat létrehozását és adatlekérését majd visszaad egy json fájlt.
 * @returns response.json fájlt, a kártyákat tartalmazó adatbázist.
 */ 
export async function getAll(): Promise<card[]> {
        const response = await fetch(url, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error("An error occured while listing the cards");
        }
        return response.json();
      }