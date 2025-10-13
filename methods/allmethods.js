import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const appl=express();
const port = 4085;
const api_url="https://secrets-api.appbrewery.com";
const bearer_token="a81009c3-cb1d-4e62-a4b5-1c2e105735cf";
const config={
    headers:{Authorization:`Bearer ${bearer_token}`},
};
appl.use(bodyParser.urlencoded({extended:true}));
appl.get("/",async(requ,resp)=>{
    resp.render("allmethodsejsfile.ejs",{
        content: "Waiting for you to send data...",
    });
});

appl.post("/getmedown",async(requ,resp)=>{
    
    let i_d=requ.body.id;
    try{
        const resp_from_api=await axios.get(api_url+"/secrets/"+i_d,config);
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(resp_from_api.data)},);
    }catch(error){
        resp.render("allmethodsejsfile.ejs", { content: "Ops! Wrong way !" });
    }
    
});
appl.post("/postmedown",async(requ,resp)=>{
    try {
        const resp_from_api=await axios.post(api_url+"/secrets",requ.body,config);
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(resp_from_api.data)});
    } catch (error) {
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(error.response.data),});
    }
});
appl.post("/putmedown",async(requ,resp)=>{
    const i_d=requ.body.id;
    try{
        const resp_from_api=await axios.put(
            api_url+"/secrets/"+i_d,
            requ.body,
            config
        );
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(resp_from_api.data)});
    }catch(error){
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(error.response.data),});
    }
});
appl.post("/patchmedown",async(requ,resp)=>{
    const i_d=requ.body.id;
    try {
        const result_from_api=await axios.patch(
            api_url+"/secrets/"+i_d,
            requ.body,
            config
        );
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(result_from_api.data)});
    } catch (error) {
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(error.response.data),});
    }

});

appl.post("/deletemedown",async(requ,resp)=>{
    const i_d=requ.body.id;
    try {
        const result_from_api=await axios.delete(api_url+"/secrets/"+i_d,config);
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(result_from_api.data)});
    } catch (error) {
        resp.render("allmethodsejsfile.ejs",{content:JSON.stringify(error.response.data),});
    }

});
appl.listen(port,()=>{
    console.log("here: ",port);
});