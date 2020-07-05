import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {LoadSpinner} from './Spinners'
import axios from 'axios'
//import "leaflet/dist/leaflet.css";

const Maps = (props) => {
  
    const defaultPosition = [[10.506098, -66.9146017]]
    const [coords, setCoords] = useState(undefined)
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState('')
    const position = props.position
    const topcities = props.numcities
    //console.log(position, "ASI ME LLEGA PARA MAPEAR")
    
    const mapstyle = { 
        height: props.height, 
        width: props.width,
        display: 'table-cell',
        justifyContent: 'center',
    }
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    


    useEffect( () => {
    
      async function fecthData(){
      let tempcoords = []
      //console.log(tempcoords, "CORDENADAS TEMPORALES EN ECTHDATA")
      //console.log(props.position, "HOT LOCATION EN FECTCH DATA")
      if(props.position !== undefined){
        //console.log(loading, "LOADING EN ENTRADO")
        isLoading(true)
        //console.log(loading, "LOADING ANTES dE AXIOS")
      for(let index = 0; index < topcities; index++){
        //console.time("CONSULTA A OSM")
        await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${position[index]}`,
        
          {timeout: 5000}
        )
          .then( result  => {
            //console.log(result.data[0].lat, result.data[0].lon, 'RESPUESTA COORDENADAS')
            tempcoords.push([result.data[0].lat,  result.data[0].lon])
            //console.timeEnd("CONSULTA A OSM")
          })
          
          .catch(error => {
            console.log(error, 'RESULTADO DE ERROR')
            setError(error)
            ///console.timeEnd("CONSULTA A OSM")
          })
        
          
      
      }
      //console.log(tempcoords, "temcoord antes de pasar a estado")
      setCoords(tempcoords)
      //console.log(loading, "LOADING TERMINANDO AXIOS")
      isLoading(false)
      //console.log(tempcoords, "coords supuestamente pasadas por tempcoord")
    }
    
  }
    fecthData()

  }      
  // locationList.map(xxx => fetchData(xxx.name),
  // //console.log(xxx.name, 'no hace')
  // )
      
   ,
     // add empty array avoid infinite loop
   []
 )



    return (
    
      
      <div>
       {!coords ?
       
        <center><LoadSpinner spinColor={props.spinColor}/></center>

        :
        
        <Map 
          style={mapstyle}
          center={coords[0]} 
          zoom={props.zoom}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {coords.map( (latlongs, index) =>
        <Marker key={index} position={coords[index]}>
          <Popup>
           Right Here!! <br /> {position[index]} Is Located
          </Popup>
        </Marker>
            )
          }
      </Map>

        
       }
    </div>
    )
  
}

export default Maps;