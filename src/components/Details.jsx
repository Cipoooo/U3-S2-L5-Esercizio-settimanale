import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Card, CardBody, CardImg, Col, Container, ListGroup, ListGroupItem, Row} from 'react-bootstrap'

const Details = () =>{

    const { city } = useParams()
    const [weatherData,setWeatherData] = useState(null)
    const [forecastData,setForecastData] = useState(null)
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=59f15800aa9e9f99aad5161c106814d3`

    

    useEffect(() => {

        const fetchCoordinates = async () =>{
            try{
                const response = await fetch(geoURL)
                const geoCoor = await response.json()

                if(response.ok && geoCoor.length >0){
                    const { lat, lon } = geoCoor[0]

                    fetchWeatherData(lat,lon);
                    fetchForecastData(lat,lon);
                }
            
            }catch(e){
                console.log(e)
            }
        };

        const fetchForecastData = async (lat,lon) =>{
            try{
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=59f15800aa9e9f99aad5161c106814d3`)
                const data = await response.json()

                if(response.ok){
                    setForecastData(data);
                }else{
                    console.log("error nel prendere i dati meto dal fetch forecast")
                }
            }catch(errore){
                console.log(errore)
            }
        };
        
        const fetchWeatherData = async (lat, lon) => {
            try{
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=59f15800aa9e9f99aad5161c106814d3`)

                const data = await response.json()

                if(response.ok){
                    setWeatherData(data);
                }else{
                    console.log("error nel prendere i dati meto dal fetch weather");
                }
            }catch(errore){
                console.log(errore);  
            }
        };

        fetchCoordinates();
        
},[city]);

{/*useEffect(() => {
        if (forecastData) {
            console.log(forecastData.list); 
        }
    }, [forecastData]);*/}

    const getForecastList = () =>{
        if(!forecastData) return [];

        return forecastData.list.filter((_,index) => index %8 === 0).slice(0,5)
    }
if(weatherData && forecastData){

    const { main , weather} = weatherData;
    const mainTemperature = ((main.temp-32)*0.55).toFixed(1) /*Non capisco perche le temperature date dal fetch siano cosi alte (250+ F), perche la conversione dovrebbe essere giusta la formula*/
    const minTemperature = ((main.temp_min-32)*0.55).toFixed(1);
    const maxTemperature = ((main.temp_max-32)*0.55).toFixed(1);
    const feltTemperature = ((main.feels_like -32)*0.55).toFixed(1);

    return(
     <>
<Container className="container-lg my-3">
    <h1 className="text-white col-12 fw-5 text-grey mt-4 mb-4 text-center fw-bolder">WEATHER IN   : {city.toUpperCase()}-{weatherData.sys.country}</h1>
<Card style={{backgroundColor:"transparent"}} className="d-block d-lg-flex flex-row-reverse">
    <CardImg className="text-white ms-2" src="" width={"100%"} height={"100%"} alt="Ho provato ad usare Unsplash ma ho fallito miseramente, pero almeno è responsive"></CardImg>
    <CardBody className="">
        <ListGroup className="rounded-5">
            <ListGroupItem className="fs-2 font-monospace"><span className="fs-2 fw-5 fw-bold">Timezone : </span> {weatherData.timezone}</ListGroupItem>
            <ListGroupItem className="fs-2 font-monospace"><span className="fs-2 fw-5 fw-bold">Weather : </span> {weather[0].main}</ListGroupItem>
            <ListGroupItem className="fs-2 font-monospace"><span className="fs-2 fw-5 fw-bold">Wind Speed : </span> {weatherData.wind.speed}K/T</ListGroupItem>
            <ListGroupItem className="fs-2 font-monospace"><span className="fs-2 fw-5 fw-bold">Wind Angle : </span> {weatherData.wind.deg}°</ListGroupItem>
            <ListGroupItem className="fs-2 font-monospace"><span className="fs-2 fw-5 fw-bold">Temperature : </span> {mainTemperature}°C, MIN-{minTemperature}°C,MAX-{maxTemperature}°C</ListGroupItem>
            <ListGroupItem className="fs-2 font-monospace"><span className="fs-2 fw-5 fw-bold">Felt Temperature : </span>{feltTemperature}°C</ListGroupItem>
            <ListGroupItem className="fs-2 mb-3 font-monospace"><span className="fs-2 fw-5 fw-bold">Humidity : </span> {main.humidity}%</ListGroupItem>
        </ListGroup>
    </CardBody>
</Card>
</Container>
    <Container fluid className="mt-2 w-100 mx-0 mb-4 bg-transparent">
    <h3 className="text-start ms-2 text-white fw-bolder fs-2 mb-3 mt-4 ">FORECAST IN {city.toLocaleUpperCase()} OF THE NEXT DAYS :</h3>
    <Row className="gx-5 gy-3 flex-gow-1 w-100 d-flex justify-content-around">
    {forecastData.list.filter((_,index) => index % 8 === 0).slice(0,5).map((forecast, i) => {
            const date = new Date(forecast.dt * 1000)
            const localDate = date.toLocaleDateString()
            const temp = ((forecast.main.temp-32)*0.55).toFixed(1)
            const minTemp = ((forecast.main.temp_min -32)*0.55).toFixed(1)
            const maxTemp = ((forecast.main.temp_max-32)*0.55).toFixed(1)
            const weatherCondition = forecast.weather[0].main
            const weatherConditionDescription = forecast.weather[0].description
        return(
        <>
        <Col className="col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2">
        <Card key={i} style={{borderRadius:"5%",height:"300px", backgroundColor:"transparent", border:"2px, solid, white", boxShadow:"0 0 1em white",marginTop:"20px"}}>
            <Card.Body>
                <Card.Title as={"h2"} className="fs-6 mb-3 text-white fw-bold">{city.toUpperCase()}-{localDate}</Card.Title>
                <Card.Text>
                    <span className="font-monospace fs-4 text-start text-white ">Temp: {temp}°C </span><br />
                    <span className="font-monospace fs-4 text-start text-white ">Min: {minTemp}°C </span><br />
                    <span className="font-monospace fs-4 text-start text-white ">Max: {maxTemp}°C</span><br />
                    <span className="font-monospace fs-4 text-start text-white ">Weather: {weatherCondition}</span><br />
                    <span className="font-monospace fs-4 text-start text-white ">Description: {weatherConditionDescription}</span>
                </Card.Text>      
            </Card.Body>
        </Card>
        </Col>
        </>
        )
      })}
    </Row> 
    </Container>
     </>
    );
}
return null
}

export default Details;