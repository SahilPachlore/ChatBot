import express, { response } from "express";
import cors from "cors";
import generate from "./generate.js";
const app=express();
app.use(express.json());
app.use(cors());
 
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/generate",async (req,res)=>{
    const queryDescription=req.body.queryDescription;
    // console.log("received message : ",queryDescription);
    // res.json({response: `you send this : ${queryDescription}`});
    try{

        const myprompt=await generate(queryDescription)
        res.json({response:myprompt})


    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }



})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });