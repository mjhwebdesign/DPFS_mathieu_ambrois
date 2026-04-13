import "./Pagination.css";
import Button from "react-bootstrap/Button";

function Pagination({ page, next, previous, setPage }) {
 return (
  <>
   <div style={{ marginTop: "20px" }}>
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
   </div>
  </>
 );
}

export default Pagination;
