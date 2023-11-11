import './App.css';
import './ComicPage.css'; 
import React, { useState } from 'react';


function App() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [blobs, setBlobs] = useState([]);
  const [msg, setMsg] = useState("Create Your Comic")




  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  async function query(data) {
    setIsLoading(true);
    setMsg("Loading your comic");
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            Accept: "image/png",
            Authorization: "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );


      const result = await response.blob();
      return result;
    } catch (error) {
      console.error("Error in query:", error);
      setIsLoading(false);
      throw error;
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const obj = {
      inputs: text,
    };

    query(obj)
      .then((res) => {
        console.log(res);
        setMsg(`Comic created`)
        setBlobs((predata) => [...predata, res]);
        isLoading(false);
      })
      .catch((error) => {
        console.error("Error in handleFormSubmit:", error);
      });
  };


  return (
    <div className="App">
      <main>
        {msg}
        <form onSubmit={handleFormSubmit}>
          <div style={{justifyContent: 'center',}}>
            <textarea
              type="text"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <div style={{justifyContent: 'center',}}>

          {blobs ?
            <>
              {blobs.map((blob, index) => (

                <img src={URL.createObjectURL(blob)} key={index} height={200}></img>

              ))}
            </>

            : <>No images</>}
        </div>
      </main>
    </div>
  );
}

export default App;