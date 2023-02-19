import { Route, Routes, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contacts from "./Screens/Contacts";

function App() {
  return (
    <HashRouter basename="/">
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route exact path="/" element={<Contacts />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
