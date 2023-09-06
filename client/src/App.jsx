import Styles from './index.module.css'
import book from './assets/book.png'
import loader from './assets/loading.gif'

import { useState } from 'react'
function App() {


  const [querySet, setquerySet]= useState("");
  const [sqlQuery,setsqlQuery]=useState("");
  const [temperature, setTemperature] = useState(0.7); // Default temperature
  const [maxTokens, setMaxTokens] = useState(300); // Default max_tokens value
  const [isLoading, setIsLoading] = useState(false); // Loading state


  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    const generatedQuery = await generateQuery();
    setsqlQuery(generatedQuery);
    setIsLoading(false); // Set loading state to false when response is received
    console.log("response from server:", generatedQuery);
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: querySet, temperature ,maxTokens }), // Include temperature in the request
    });

    const data = await response.json();
    return data;
  };
  return (
   
    <main className={Styles.main}>

      <img src={book} alt="" className={Styles.icon}/>
      <h3>Generate story with AI</h3>
      <form onSubmit={onSubmit}>
        <input type="text" name="story-description" placeholder='Describe your story '
        onChange={(e)=> setquerySet(e.target.value)}
        />
               <div>
        <label htmlFor="temperature">Temperature:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
      </div>
      <div>
          <label htmlFor="maxTokens">Story Length:</label>
          <input
            type="range"
            min="200"
            max="600"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
          />
          <span>{maxTokens}</span>
        </div>

 
        <input type="submit" value="Generate Query" />
        
        {/* Add a loading GIF when isLoading is true */}
        {isLoading && <img src={loader} alt="Loading" className={Styles.icon} />}
        

        
      <div className={Styles.responseBox}>
          {sqlQuery.response}
        </div>
      </form>



    </main>
  )
}

export default App
