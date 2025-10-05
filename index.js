import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const directions = dirname(fileURLToPath(import.meta.url));

const appl = express();

const port = 3446;

console.log(directions);

appl.use(bodyParser.urlencoded({ extended: true }));  //From raw unstructured data to Organised

function passchecker(requ, resp, next) {
    const passing = requ.body["security"]
    if (passing == "oggy") {
        appl.post("/connected",(requ,resp)=>{ 
            resp.sendFile(directions + "/public/secretzoro.html");
        });
        next();
    }else{
        resp.redirect("/");
    }
}
appl.get("/", (requ, resp) => {
    resp.sendFile(directions + "/public/index_2.html");
});
appl.use(passchecker);

appl.listen(port, () => {
    console.log("I am running on Port : " + port);
});
