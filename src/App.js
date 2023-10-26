import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Read from './components/Read';
import Create from './components/Create';
import { Route,  Routes , useNavigate}  from 'react-router-dom'
import Login from './components/Login';
import { useState } from 'react';
import Edit from './components/Edit';

function App() {
  const [user, setUser] = useState(null);
  // Function to handle user login
  const handleLogin = (data) => {
    setUser(data);
  }
  const Navigate = useNavigate()
    return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login onSubmit={handleLogin} />} />
        <Route path="/read" element={<Read />} />
        <Route
          path="/create"
          element={user ? <Create user={user} /> : <Navigate to="/read" />}
        />
         <Route path="/edit" element=<Edit/> />
      </Routes>
      </div>
  );
}

export default App;
