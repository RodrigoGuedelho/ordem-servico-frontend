//import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import  Router from './routes'

function App(props) {
  return (
    <div className="App">
     <NavBar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
