import './App.css';
import Formulario from './components/form';
import Tabla from './components/table';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return (
   <>
       <Navbar/>
       <Routes>
         <Route path='/' element={<Tabla/>} />
         <Route path='/registrar' element={<Formulario/>} />
       </Routes>
   </>
  );
}

export default App;
