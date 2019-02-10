import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Map = withScriptjs(withGoogleMap((props) =>{

  
  return (
      <GoogleMap
        defaultZoom={13}
        center={ props.location }
        >
      <Marker
          position={ props.location }
        />  
      </GoogleMap>
    )
  }
))

export default Map
