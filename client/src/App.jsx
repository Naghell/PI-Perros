import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CreateDog from "./components/CreateDog/CreateDog";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/dog' element={<CreateDog/>}/>
      </Routes>
    </div>
  );
}

export default App;
