import React, { useState, useEffect } from 'react'
import Header from '../layout/Header'
import SideBar from '../components/SideBar'
import { ModalLoc } from '../components/ModalLoc'
import Queryservice from '../services/QueryService'
import Rating from 'react-rating'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CustomBreadCumb from '../components/CustomBreadCumb'
import { BorderSpinner} from '../components/Spinners'
import { FaRegPlusSquare } from 'react-icons/fa'
import { 
          Card, CardColumns, Row, Button, OverlayTrigger, Tooltip 
        
        } from 'react-bootstrap'
import { 
        TiStarFullOutline, TiStarOutline, TiWeatherCloudy, TiWeatherSunny,
        TiWeatherDownpour, TiWeatherShower, TiWeatherSnow, TiWeatherStormy, 

      } from 'react-icons/ti'


const queryservice = new Queryservice()
const MySwal = withReactContent(Swal)
const imageApiUrl = 'images_api/'
const weatherApiUrl = 'weather_api/'

const style = {

  color: 'black'
}


const Locations = (props) => {

    const [locationList, getLocs] = useState([])
    const [loading, isLoading] = useState(false)
    const[modalshow, handleHide] = useState(false)
    const[selecLoc, SelectedLoc] = useState('')
    const[weather, showWeather] = useState({main:{} , weather:[{}]})
    const[error, showError] = useState('')
    const images = []
    const[imagesList, setImages] = useState([])
    const[fieldloc, handlelistLoc] = useState({});
    const[message, setMessage] = useState('')
    const[data, sendData] = useState({})

    const { validated } = 'false';
    const style = {
        height: '100px',
        width: '200px'
        }

    async function fetchWeather(name) {
      
      await axios.post(weatherApiUrl, {location: name},
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
          'Content-Type': 'application/json'
          }
        }
      )
        .then( result  => {
          showWeather(result.data)
         // console.log(result.data, 'RESULTADO DE WEATHER AS STATE')
        })
        .catch(error => {
          console.log(error.message, 'RESULTADO DE ERROR')
          showError(error.message)
      
        })
          
    }

        
    useEffect(() => {
      isLoading(true)
        //console.log(props.fields.location) 
      queryservice.getLocations()
         .then( async result => {
            //console.log(result.data, 'result de LOCATIIONS')
            getLocs(result.data)
            //console.log(locationList, 'LOCATIONS AS STATE')
            const templocationlist = result.data
             // console.log(templocationlist, "lista temporal")
              for   (let nameimage of templocationlist){
                await axios.post(imageApiUrl, {location: nameimage.name}, 
                  { headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('tkaccess')}`,
                            'Content-Type': 'application/json'
                              }
                  }
                )
                //await axios.get(``)
                  .then( result  => {
            
                    //getLocs(...locationList, [{image:locationList.result.data.hits.imageURL}])
                    //console.log(result.data.hits[0].largeImageURL, 'RESULTADO DE IMAGEN PIXABAY AS STATE')
                    
                    //choose only one from ramdom picture result array
                    images.push(result.data.hits[Math.floor(Math.random() * 4)].webformatURL)
                  // console.log(images, 'IMAGEN YA GUARDADAS PARa PRESENTAR')
                  })
                  .catch(error => {
                    console.log(error.message, 'RESULTADO DE ERROR')
                    showError(error.message)
                  })
              }
              setImages(images)
              isLoading(false)
         })
        .catch( error  => {
          showError([error.message])
          isLoading(false)    
        })
          
        
        
      }      
     // locationList.map(xxx => fetchWeather(xxx.name),
     // console.log(xxx.name, 'no hace')
     // )
    //console.log('It got rendered')    
      ,
        // add empty array avoid infinite loop
      []
    )
    
    const Showed = (event) => {
        handleHide(!modalshow)
        }
    const Selected = (name) => {
        SelectedLoc(name)
    }

    const handleChange = (event) => {
      
      handlelistLoc({...fieldloc, 
        
        [event.target.name]: event.target.value
        
      })
      //console.log(fieldloc, "cambios en LOCS")
    }
    
    
    const NewLocation = (newdata) => {
    queryservice.createLocation(newdata)
        .then( result => {
          //console.log(result, 'CREADO LOCATION')
           setMessage(...message, 'success')
           Showed()
           getLocs([...locationList, result.data])
           MySwal.fire(
            'Location Created Sucessfull!',
            '',
            'success'
            )
           //console.log(this.state.locations, 'Locations state con axios')
           
         })
         .catch( error  => {
          console.log(error.message, 'ERORR CREATE LOCATION')
          MySwal.fire(
            'Error',
            error.response.statusText,
            'error'
            )
         })

        }




    /////////////////////////const {main:{temp} , weather:[{main}]} = weather

    return (
        <>
        {/*console.log(imagesList, "AQUI ESTAN LISTAS PARA MOSTRAR")*/}
          <Header brand={props.nameapp} alerts={MySwal}/>
            <div id="content-wrapper">
              <SideBar/>
        
              <div className="container-fluid mt-2" style={{paddingLeft: '80px'}}>
                <ModalLoc
                  showed={modalshow}
                  hide={Showed}
                  NewLocation={NewLocation}
                  handleChange={handleChange}
                  fieldloc={fieldloc}
                />
                <Row className="m-1">
                  <CustomBreadCumb
                    breadpage={"Locations"}
                    title={"Weather & Rating"}
                  />

                  <Button  
                  onClick={Showed} variant="success" className="m-5">
                   <FaRegPlusSquare size="2em"/>   Add New
                  </Button>
                </Row>
          
                
                <CardColumns>
                {
                 !loading && locationList.length === 0 ?
                 <> 
                 <p></p>
                 <center>
                  <Card>
                    <Card.Body className="text-dark">
                   There is not Locations yet, Please add new for start
                   </Card.Body>
                   </Card> 
                   </center>
                  </>
                 
                 :
                  
                locationList.map((locations, index) =>
                 <React.Fragment key={index}> 
           
                  <Card  style={{flex: 1}}>
                    <Card.Body 
                      className="h-100 color-black " 
                      onClick={() =>
                        fetchWeather(locations.name) 
                              }
                      onMouseOut={() => 
                        showWeather({main:{} , weather:[{}]})
                                    }
                    >
                      <OverlayTrigger
                        placement="right-end"
                        delay={{ show: 250, hide: 400 }}
                        overlay={ 
                      
                          <Tooltip id={index}>
                            {
                              !weather.weather[0].main ?

                              <h3>Click To Check Weather</h3>

                            :
                            <>
                              <h3>Temp {weather.main.temp} C</h3>
                              <h3>Weather {weather.weather[0].main === "Clouds" ? 
                                <TiWeatherCloudy size="2.5em"/>
                                : weather.weather[0].main === "Thunderstorm" ?
                                <TiWeatherStormy size="2.5em"/>
                                : weather.weather[0].main === "Drizzle" ?
                                <TiWeatherShower size="2.5em"/>
                                : weather.weather[0].main === "Rain" ?
                                <TiWeatherDownpour size="2.5em"/>
                                : weather.weather[0].main === "Snow" ?
                                <TiWeatherSnow size="2.5em"/>
                                : weather.weather[0].main === "Clear" ?
                                <TiWeatherSunny size="2.5em"/>
                                :
                                <p>NO DATA</p>
                              }
                              </h3>
                            </>
                            }  
                        
                          </Tooltip>
                        }
                      >
            
                    { loading ?
                      <center><h3><BorderSpinner/></h3></center>
                    :
                    <Card.Img variant="top" 
                    
                      src={                          
                          imagesList.length > 0 ? 
                          imagesList[index]
                          : 
                          require('../layout/img/site/no-image-available-icon-6.jpg')
                          }

                    
                    />
                    }

                  </OverlayTrigger>
                  <Card.Title className="text-dark"  >{locations.name}</Card.Title>
                  <Card.Text className="text-dark" >
             
                      This card has supporting text below as a natural lead-in to additional
                        content.{' '}This card has supporting text below as a natural lead-in to additional
                        content.{' '}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    <Rating 
                      stop={10}
                      step={2}
                      initialRating={locations.rating}
                      emptySymbol={<h3><TiStarOutline/></h3>}
                      fullSymbol={<h3><TiStarFullOutline/></h3>}
                    />
                </small>
                </Card.Footer>
            </Card> 
         
          </React.Fragment>
            )}
        </CardColumns>
                       
      </div>
    </div>
    
       </>
    )
}

export default Locations
