import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from './contexts/CartContexts';
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailsContainer } from "./components/ItemDetailsContainer";
import { Cart } from './components/Cart';
import { NavBar } from "./components/NavBar";
import './index.css';


function App() {

  return (
    <>
    <Provider>
    <BrowserRouter>
     <NavBar />
     <Routes>
     <Route path="/" element={<ItemListContainer/>}/>
     <Route path="/Cart" element={<Cart/>}/>
     <Route path="/category/:id" element={<ItemListContainer/>}/>
     <Route path="/items/:id" element={<ItemDetailsContainer/>}/>
     <Route path="*" element={404}/>
     </Routes>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App;
