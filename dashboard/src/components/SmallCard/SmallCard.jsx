import "./SmallCard.css";
import Card from "react-bootstrap/Card";

function SmallCard({ title, value }) {
 return (
  <Card>
   <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>{value}</Card.Text>
   </Card.Body>
  </Card>
 );
}

export default SmallCard;
