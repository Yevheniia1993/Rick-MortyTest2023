import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Episodes from "./components/Episodes";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
function App() {
  const [user, setUser]=useState({})
  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwt_decode(response.credential)
    setUser(userObject)
    document.getElementById("signInDiv").hidden=true
  }
  function handleSignOut(event){
    setUser({})
    document.getElementById("signInDiv").hidden=false
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "596699955658-41a6e7vcqta48v9joins78qudlbohogf.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt()
  }, []);
  return (
    <>
    <div className="button-google">
    
      <div className="block-logOut">
      {Object.keys(user).length !== 0 &&
       <button onClick={(e)=> handleSignOut(e)}>EXIT</button>
      }
      {user &&
        <img src={user.picture} alt=""/>
      }
      </div>
      <div id="signInDiv" ></div>
    </div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Episodes" element={<Episodes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
