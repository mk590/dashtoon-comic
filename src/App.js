import './App.css';
import './ComicPage.css';
import React, { useState } from 'react';


function App() {
  const [text, setText] = useState('');
  const [blobs, setBlobs] = useState([]);
  const [msg, setMsg] = useState("Create Your Comic")




  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  async function query(data) {
    setMsg("Loading your comic");
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
        setMsg(`Comic created`)
        setBlobs((predata) => [...predata, res]);
      })
      .catch((error) => {
        console.error("Error in handleFormSubmit:", error);
      });
  };


  return (
    <div className="App">
      <>
        <div style={{ marginTop:'10px', }}>

          <div>
          <form onSubmit={handleFormSubmit}>
            <div style={{ justifyContent: 'center'}}>
              <textarea
                type="text"
                value={text}
                onChange={handleTextChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
         
          <p> {msg}</p>
          </div>
        </div>
        <div class='comicsection' style={{ justifyContent: 'center', }}>

          {blobs ?
            <>
              {blobs.map((blob, index) => (

                <img src={URL.createObjectURL(blob)} key={index} height={200}></img>

              ))}
            </>

            : <>No images</>}
        </div>
      </>
    </div>
  );
}

export default App;
