import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from './Form';
import Show from './Show';

// import Student from './Student';

function App() {
  
  return (
    <div>
       <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Show />} />
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
