import "./ProductsTable.css";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function ProductsTable({ products, onDelete }) {
 const navigate = useNavigate();

 const handleEdit = (id) => {
  navigate(`/edit-product/${id}`);
 };
 return (
  <>
   <h2>Listado de productos</h2>
   <Button className="eikon-btn" href="/create-product">
    Crear Producto
   </Button>
   <div className="border-table">
    <table>
     <thead>
      <tr>
       <th>ID</th>
       <th>Nombre</th>
       <th>Descripción</th>
       <th></th>
      </tr>
     </thead>

     <tbody>
      {products.map((p) => (
       <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.name}</td>
        <td>{p.description}</td>
        <td>
         <Button onClick={() => handleEdit(p.id)} variant="warning">
          Editar
         </Button>
         <Button onClick={() => onDelete(p.id)} variant="danger">
          Eliminar
         </Button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </>
 );
}

export default ProductsTable;
