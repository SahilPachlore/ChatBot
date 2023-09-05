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
   const queryDescription=await req.body.queryDescription;
   



})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });