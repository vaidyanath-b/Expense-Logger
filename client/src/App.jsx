import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
      <Route path="/" element={<div>helloo</div>} />
    </Routes>
      </Router>
  )
}

export default App
