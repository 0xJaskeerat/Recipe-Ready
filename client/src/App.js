import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Auth from './pages/Auth';
import CreateRecipes from './pages/CreateRecipes';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/create" element={<CreateRecipes />}></Route>
          <Route path="/saved" element={<SavedRecipes />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
