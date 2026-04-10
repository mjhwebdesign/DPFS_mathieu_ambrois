function LastProduct({ products }) {
 if (!products || products.length === 0) {
  return <p>Cargando...</p>;
 }

 const lastProduct = products[products.length - 1];

 return (
  <div>
   <h2>Último producto</h2>
   <p>{lastProduct.name}</p>
   <p>{lastProduct.description}</p>
  </div>
 );
}

export default LastProduct;
