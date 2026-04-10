import { useEffect, useState } from "react";
import { getProducts, getUsers } from "../services/api";

import SmallCard from "../components/SmallCard";
import LastProduct from "../components/LastProduct";
import Categories from "../components/Categories";
import ProductsTable from "../components/ProductsTable";

function Home() {
 // Total Products
 const [totalProducts, setTotalProducts] = useState(0);
 //Product per page
 const [products, setProducts] = useState([]);
 // Total Users
 const [totalUsers, setTotalUsers] = useState(0);
 //Users per page
 const [users, setUsers] = useState([]);
 const [countByCategory, setCountByCategory] = useState({});
 //Pagination
 const [page, setPage] = useState(1);
 const [next, setNext] = useState(null);
 const [previous, setPrevious] = useState(null);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const productsData = await getProducts(page);
    setProducts(productsData.products);
    setCountByCategory(productsData.countByCategory);
    setTotalProducts(productsData.count);
    setNext(productsData.next);
    setPrevious(productsData.previous);

    const usersData = await getUsers();
    setUsers(usersData.users);
    setTotalUsers(usersData.count);
   } catch (error) {
    console.error(error);
   }
  };

  fetchData();
 }, [page]); // Re-render only when page change. Avoid loop (setProducts, setUsers to rerender on each fetch)
 return (
  <div>
   <h1>Dashboard Eikon</h1>

   <div style={{ display: "flex", gap: "20px" }}>
    <SmallCard title="Total de Productos" value={totalProducts} />
    <SmallCard title="Total de Usuarios" value={totalUsers} />
    <SmallCard
     title="Total de Categorías"
     value={Object.keys(countByCategory).length}
    />
   </div>

   <LastProduct products={products} />
   <Categories data={countByCategory} />
   <ProductsTable products={products} />
   <div style={{ marginTop: "20px" }}>
    <button onClick={() => setPage(page - 1)} disabled={!previous}>
     Anterior
    </button>

    <span style={{ margin: "0 10px" }}>Página {page}</span>

    <button onClick={() => setPage(page + 1)} disabled={!next}>
     Siguiente
    </button>
   </div>
  </div>
 );
}

export default Home;
