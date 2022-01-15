import axios from "axios"

const instance = axios.create({
    baseURL: "http://openlibrary.org"
});

export default instance

export const exploreData = [
    {
        category:"Fantasy",
        imgCategory:require("./assets/fantasyBookFilled.png"),
        bgCategory:"#876e7b",
        query: "fantasy"
    },
    {
        category:"Poliziesco",
        imgCategory:require("./assets/detectiveBookFilled.png"),
        bgCategory:"#aa9400",
        query: "detective"
    },
    {
        category:"Avventura",
        imgCategory:require("./assets/adventureBookFilled.png"),
        bgCategory:"#4f7b91",
        query: "adventure"
    },
    {
        category:"Horror",
        imgCategory:require("./assets/horrorBookFilled.png"),
        bgCategory:"#A63528",
        query: "horror"
    },

    {
        category:"Storico",
        imgCategory:require("./assets/historicalBookFilled.png"),
        bgCategory:"#00826c",
        query: "historical"
    },
]

export const returnFromQuery = (text) => {
    let categories;
    switch (text) {
        case "fantasy":
            categories = "Fantasy"
            break;
        case "historical":
            categories = "Storico"
            break;
        case "horror":
            categories = "Horror"
            break;
        case "adventure":
            categories = "Avventura"
            break;
        case "detective":
            categories = "Poliziesco"
            break;
        default:
            ""
            break;
    }
    return categories;
}