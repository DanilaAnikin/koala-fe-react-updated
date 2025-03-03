import { Character } from "../types";

export const getData = async() => {
    const data = await fetch('http://localhost:8000/'); // Set up your .env file on BE to this PORT (or other and change it here)

    const chars = await data.json();
    
    return await chars.characters as Character[];
}