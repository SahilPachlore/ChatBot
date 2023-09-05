import Styles from './index.module.css'
import book from './assets/book.png'
import { useState } from 'react'
function App() {


  const [querySet, setquerySet]= useState("");
  const [sqlQuery,setsqlQuery]=useState("");
  const onSubmit= async (e)=>{
    e.preventDefault();
    const generatedQuery = await generateQuery();
    setsqlQuery(generatedQuery);
    console.log("response from server : ",generatedQuery);

  }



  const generateQuery=async()=>{
    const response=await fetch("http://localhost:3000/generate",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: querySet}),
    })

    const data = await response.json();
    return data;
  }
  return (
   
    <main className={Styles.main}>

      <img src={book} alt="" className={Styles.icon}/>
      <h3>Generate story with AI</h3>
      <form onSubmit={onSubmit}>
        <input type="text" name="story-description" placeholder='Describe your story '
        onChange={(e)=> setquerySet(e.target.value)}
        />
        <input type="submit" value="Generate Query" />
        
      </form>
      <pre>{sqlQuery.response}</pre>


    </main>
  )
}

export default App
