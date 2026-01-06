import Home from "../src/pages/Home";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
function App() {
return(
  <Router>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path ='register' element={<Register />}></Route>

</Routes>
  </Router>
)
}

export default App;
