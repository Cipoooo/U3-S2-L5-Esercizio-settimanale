import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () =>{
    return(
        <>
        <Container className="bg-transparent container-fluid text-center d-flex flex-column">
            <h1 className="text-white fs-1 fw-bolder" style={{marginTop:"100px"}}>ERROR 404- PAGINA NON TROVATA </h1>
            <h2 className="text-white fs-4 mt-3">Ci dispiace ma sembra che la pagina che cerchi non sia più disponibile o il link cercato non sia corretto</h2>
            <Link  to={"/"}><Button className="btn-info p-3 mt-5 rounded-5 text-white">Torna alla home</Button></Link>
        </Container>
        </>
    );
};
export default NotFound;