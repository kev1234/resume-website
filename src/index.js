import "dotenv/config"
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from "path";
import express from "express"
import bodyParser from "body-parser";
import axios from "axios";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_API_URL = process.env.BASE_URL; 
const port = process.env.PORT;
const app = express();

app.use(express.static('src/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '/views'));

app.get("/", (req, res) => {
    res.render("home.ejs", { elementID: "home", title: "Keven Philibert"});
});

app.get("/experience", async (req, res) => {
    const data = await getRequest("/jobs");
    res.render("experience.ejs", { elementID: "experience", title: "Expérience Professionnelle", jobs : data});
});

app.get("/techno", async (req, res) => {
    const data1 = await getRequest("/languages");
    const data2 = await getRequest("/tools");
    res.render("techno.ejs", { elementID: "techno", title: "Compétence",  languages: data1, tools: data2});
});

app.get("/education", async (req, res) => {
    const data = await getRequest("/formations");
    res.render("education.ejs", { elementID: "education", title: "Éducation",  formations: data});
});

app.get("/about", (req, res) => {
    res.render("about.ejs", { elementID: "about", title: "À propos"});
});

/*port setup*/
app.listen(port, () => {
    console.log("Server started on port " + port);
});

/*API requests*/
async function getRequest(endpoint) {
    try {
        const response = await axios.get(BASE_API_URL + endpoint);
        if (response) return response.data;
    } catch (error) {
        console.error(error);
    }
}