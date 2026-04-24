import { useEffect, useState } from "react";
import { getProducts, getUsers, deleteProduct } from "../services/api";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SmallCard from "../components/SmallCard/SmallCard";
import LastProduct from "../components/LastProduct/LastProduct";
import Categories from "../components/Categories/Categories";
import ProductsTable from "../components/ProductsTable/ProductsTable";
import Pagination from "../components/Pagination/Pagination";

function Home() {
 // Total Products
 const [totalProducts, setTotalProducts] = useState(0);
 //Product per page
 const [products, setProducts] = useState([]);
 // Total Users
 const [totalUsers, setTotalUsers] = useState(0);
 //Users per page
 const [users, setUsers] = useState([]);
 //Last product
 const [lastProduct, setLastProduct] = useState(null);
 // Product Per category
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
    setLastProduct(productsData.lastProduct);
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
 }, [page]); // Re-render only when page change.
 //  Avoid loop (setProducts, setUsers to rerender on each fetch)

 const handleDelete = async (id) => {
  try {
   await deleteProduct(id);
   setProducts(products.filter((p) => p.id !== id));
   alert("Producto Borrado");
  } catch (error) {
   alert(error.message);
  }
 };

 return (
  <>
   <Navbar>
    <Container fluid>
     <Navbar.Brand
      href="http://localhost:3000/"
      target="_blank"
      className="logo-eikon"
     >
      EIK<span className="iso">[Ө]</span>N
     </Navbar.Brand>{" "}
     DASHBOARD
    </Container>
   </Navbar>

   <Container>
    <Row>
     <Col md={6}>
      <SmallCard title="Total de Productos" value={totalProducts} />

      <SmallCard title="Total de Usuarios" value={totalUsers} />

      <SmallCard
       title="Total de Categorías"
       value={Object.keys(countByCategory).length}
      />
      <Categories data={countByCategory} />
     </Col>

     <Col md={6}>
      <LastProduct lastProduct={lastProduct} />
     </Col>

     <Col>
      <ProductsTable products={products} onDelete={handleDelete} />
      <Pagination
       page={page}
       next={next}
       previous={previous}
       setPage={setPage}
      />
     </Col>
    </Row>
   </Container>
  </>
 );
}

export default Home;
