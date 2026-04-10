function Categories({ data }) {
 return (
  <div>
   <h2>Categorías</h2>
   <ul>
    {Object.entries(data).map(([name, count]) => (
     <li key={name}>
      {name}: {count}
     </li>
    ))}
   </ul>
  </div>
 );
}

export default Categories;
