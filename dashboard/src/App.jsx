import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create-product" element={<CreateProduct />} />
    <Route path="/edit-product/:id" element={<EditProduct />} />
   </Routes>
  </BrowserRouter>
 );
}

export default App;
