import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddNote from "./components/AddNote"
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Footer from './components/Footer';
import DropDown from './components/DropDown';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <DropDown></DropDown>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/addnote" element={<AddNote/>} />
            </Routes>
          </div>
          <Alert message="This is amazing React course" />
          <Footer></Footer>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
