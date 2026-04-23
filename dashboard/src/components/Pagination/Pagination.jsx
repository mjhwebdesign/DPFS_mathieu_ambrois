import "./Pagination.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";

function Pagination({ page, next, previous, setPage }) {
 return (
  <>
   <Row>
    <Col className="text-end">
     <Button
      className="eikon-btn"
      onClick={() => setPage(page - 1)}
      disabled={!previous}
     >
      Anterior
     </Button>

     <span style={{ margin: "0 10px" }}>Página {page}</span>

     <Button
      className="eikon-btn"
      onClick={() => setPage(page + 1)}
      disabled={!next}
     >
      Siguiente
     </Button>
    </Col>
   </Row>
  </>
 );
}

export default Pagination;
