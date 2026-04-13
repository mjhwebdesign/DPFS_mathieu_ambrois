import "./LastProduct.css";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/esm/CardBody";

function LastProduct({ lastProduct }) {
 if (!lastProduct) {
  return <p>Cargando...</p>;
 }

 return (
  <Card>
   <CardBody>
    <Card.Title>Último producto cargado</Card.Title>

    <Card.Img
     variant="top"
     src={`http://localhost:3000${lastProduct.cover_image}`}
    />

    <Card.Title>{lastProduct.title}</Card.Title>
    <Card.Text>{lastProduct.description}</Card.Text>
   </CardBody>
  </Card>
 );
}

export default LastProduct;
