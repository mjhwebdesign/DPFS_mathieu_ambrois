import "./Categories.css";
import Card from "react-bootstrap/Card";

function Categories({ data }) {
 return (
  <>
   <Card>
    <Card.Body>
     <Card.Title>Productos por Categorías</Card.Title>

     {Object.entries(data).map(([name, count]) => (
      <Card.Text key={name}>
       {name}: {count}
      </Card.Text>
     ))}
    </Card.Body>
   </Card>
  </>
 );
}

export default Categories;
