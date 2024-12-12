import { useEffect, useState } from "react";
import { Container, Form, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import {FaSearch} from 'react-icons/fa'
import { Link} from "react-router-dom";

const arrayCities = ["Tirana","Andorra la Vella","Yerevan","Vienna","Baku","Minsk","Brussels","Sarajevo","Sofia","Zagreb","Nicosia","Prague","Copenhagen","Tallinn","Helsinki","Paris","Tbilisi","Berlin","Athens","Budapest","Reykjavik","Dublin","Rome","Nur-Sultan","Pristina","Riga","Vaduz","Vilnius","Luxembourg","Valletta","Chișinău","Monaco","Podgorica","Amsterdam","Skopje","Oslo","Warsaw","Lisbon","Bucharest","Moscow","Belgrade","Bratislava","Ljubljana","Madrid","Stockholm","Bern","Ankara","Kyiv","London",];

  const getRandomCityName = () => {
    return arrayCities[Math.floor(Math.random() * arrayCities.length)];
  };

const Home = () =>{

    const [input,setInput] = useState("")
    const[searchedCities, setSearchedCities] = useState([])
    const [cityName, setCityName] = useState(getRandomCityName());
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            setCityName(getRandomCityName());
        },1000);

        return () => clearInterval(intervalId);
    },[]);

    const handleSearch = () =>{
      if (input && !searchedCities.includes(input)){
        setSearchedCities((prevCities) => [...prevCities,input])
      }
    }
    return(
        <>
        <h1 className="text-center text-white mt-5 font-monospace">WHATS THE WEATHER IN <span><Link to={`/details/${cityName}`} className="fs-1 me-2" style={{color:"lightblue"}}>{cityName.toUpperCase()}</Link></span>? SEE IT FOR YOURSELF</h1>
         <Container className="container-lg h-100 w-75">
           <Form className="d-flex justify-content-center align-items-center mt-5 position-relative">
            
            <FormControl id="inputId" placeholder="Search for any City in the world" className="py-2 w-50 text-center text-black"  
            onChange={(e) => setInput(e.target.value)} value={input}/>
            <Link to={`/details/:${input}`} onClick={() => handleSearch()}><FaSearch  className="ms-2 text-white fs-3"/></Link>
           </Form>
           {searchedCities.length > 0 &&(
            <div>
              <h4 className="text-white">Cities you have searched:</h4>
              <ListGroup>
                {searchedCities.map((searchedCity, i) =>{
                  return (
                  <>
                  <ListGroupItem key={i} className="bg-transparent">
                      <Link to={`/details/${searchedCity}`}><span className="text-white">{searchedCity.toUpperCase()}</span></Link>
                    </ListGroupItem>
                  </>
                  )
                })}
              </ListGroup>
            </div>
           )}
         </Container>
        </>
    );
};
export default Home;