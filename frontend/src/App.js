import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column">
            <Routes>
              <Route exact path="/" element={<UserList />}></Route>
              <Route exact path="/add" element={<AddUser />}></Route>
              <Route path="/edit/:id" element={<EditUser />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
