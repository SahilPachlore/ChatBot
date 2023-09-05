import { useState } from 'react'
function App() {

    const [query,setquery]=useState("");
    const [reply,setreply]=useState("");
    const onSubmit= async (e)=>{


        e.preventDefault();
        const generatedQuery= new generateQuery();
        setreply(generatedQuery);


    }
    const generateQuery= async ()=>{
        const response= await fetch("http://localhost:3000/generate",{
            method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: query}),
        })
        const data= await response.json();
        return data;
    }



    return(
        <main>
        <h1>Heyyy</h1>
        <form onSubmit={onSubmit}>

            <input type='text' onChange={(e)=>setquery(e.target.value)}></input>
            <button type='submit'>Submit</button>

        </form>
        <pre>{reply.response}</pre>
        </main>
     
    );

}