import {card} from "./card.ts";
const url = "https://frontend-dle-db-default-rtdb.europe-west1.firebasedatabase.app/.json";

 export async function getAll(): Promise<card[]> {
        const response = await fetch(url, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) {
          throw new Error("An error occured while listing the cards");
        }
        return response.json();
      }