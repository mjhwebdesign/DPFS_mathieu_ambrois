import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./components/Auth/AdminRoute";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route
     path="/create-product"
     element={
      <AdminRoute>
       <CreateProduct />
      </AdminRoute>
     }
    />
    <Route
     path="/edit-product/:id"
     element={
      <AdminRoute>
       <EditProduct />
      </AdminRoute>
     }
    />
   </Routes>
  </BrowserRouter>
 );
}

export default App;
