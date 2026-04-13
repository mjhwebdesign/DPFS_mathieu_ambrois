import "./ProductsTable.css";

function ProductsTable({ products }) {
 return (
  <>
   <h2>Listado de productos</h2>
   <div className="border-table">
    <table>
     <thead>
      <tr>
       <th>ID</th>
       <th>Nombre</th>
       <th>Descripción</th>
      </tr>
     </thead>

     <tbody>
      {products.map((p) => (
       <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.name}</td>
        <td>{p.description}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </>
 );
}

export default ProductsTable;
