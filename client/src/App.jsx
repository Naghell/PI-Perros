import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import CreateDog from "./components/CreateDog/CreateDog";
import Detail from "./components/Detail/Detail";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='*' element={<NotFound />} />
        <Route path='/home' element={<Home/>}/>
        <Route path= '/home/:id' element= {<Detail/>}/>
        <Route path='/dog' element={<CreateDog/>}/>
      </Routes>
    </div>
  );
}

export default App;
