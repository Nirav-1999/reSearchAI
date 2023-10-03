import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Home from './components/Home'; 
import Learn from './components/Learn';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route path='/pdf/:encodedUrl' element={<Learn />}></Route>

          </Routes>
          <link 
            rel="stylesheet" 
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" 
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" 
            crossOrigin="anonymous"
          />
      </div>
    </Router>
  );
}

export default App;
