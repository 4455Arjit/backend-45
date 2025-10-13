import express from "express";
import axios from "axios";
const appli=express();
const portno=5465;
const api_uni="https://secrets-api.appbrewery.com";


const u_name="oggy_jack";
const passing="jackhammer";
const api_key="448b7e2d-ff0d-4186-97ba-271601055966";
const bearer_token="a81009c3-cb1d-4e62-a4b5-1c2e105735cf";
appli.get("/",(requ,resp)=>{
    resp.render("indexindex.ejs",{content:"Waiting for a Click"});

});
appli.get("/noAuth",async(requ,resp)=>{
    try{const result_from_api_link=await axios.get(api_uni+"/random");
        resp.render("indexindex.ejs",{content:JSON.stringify(result_from_api_link.data)});
}
catch(error){
    resp.status(404).send(error.message);
}
});
appli.get("/basicAuth",async(requ,resp)=>{
    try{
        const result_from_api_link=await axios.get(api_uni+"/all?page=2",{            auth:{
                username:u_name,
                password:passing,
            },
        });
        resp.render("indexindex.ejs",{
            content:JSON.stringify(result_from_api_link.data)
        });
    }catch(error){
        resp.status(404).send(error.message);
    }
});
appli.get("/apikey",async(requ,resp)=>{
    try{
    const result_from_api_link=await axios.get(api_uni+"/filter",{
        params:{
            score:4,
            apiKey:api_key,
        }
    });
    resp.render("indexindex.ejs",{content:JSON.stringify(result_from_api_link.data)});
}catch(error){
    resp.status(404).send(error.message);
}
});
const config={
    headers:{ Authorization: `Bearer ${bearer_token}`},
};
console.log(api_uni+"/secrets/2"+config);
console.log(JSON.stringify(config));
appli.get("/bearerToken",async (requ,resp)=>{
    try {
        const result_from_api_link= await axios.get(api_uni+"/secrets/2",config);
        console.log(api_uni+"/secrets/2"+config);
        resp.render("indexindex.ejs",{content:JSON.stringify(result_from_api_link.data)});
    } catch (error) {
        resp.status(404).send(error.message);
}
});
appli.listen(portno,()=>{
    console.log("im dead here: -> "+portno);
});