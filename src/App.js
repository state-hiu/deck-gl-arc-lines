/// app.js
import React, {useState} from 'react';
import DeckGL from '@deck.gl/react';
//import {LineLayer} from '@deck.gl/layers';
import {ArcLayer} from '@deck.gl/layers';
import {Map} from 'react-map-gl';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// add to apply the following fix so that the basemap works in production: https://github.com/visgl/react-map-gl/issues/1266
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGl1IiwiYSI6InJWNGZJSzgifQ.xK1ndT3W8XL9lwVZrT6jvQ';

// Viewport settings
// const INITIAL_VIEW_STATE = {
//   longitude: 22.937,
//   latitude: 50.791,
//   zoom: 5,
//   maxZoom: 15,
//   pitch: 30,
//   bearing: 0
// };

// Data to be used by the LineLayer
// const data = [
//   {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

const data =
[
  {
    "origin": "Ukraine",
    "destination": "Poland",
    "label": "Ukraine-Poland",
    "source_lat": 50.401,
    "source_lng": 30.2456,
    "from_coords": [
      30.2456,
      50.401
    ],
    "target_lat": 52.232,
    "target_lon": 20.7741,
    "to_coords": [
      20.7741,
	  52.232
    ],
    "population": 377400,
    "Linewidth": 31.019654000171,
    "inbound": 255,
    "outbound": 65025
  },
  {
    "origin": "Ukraine",
    "destination": "Slovakia",
    "label": "Ukraine-Slovakia",
    "source_lat": 50.401,
    "source_lng": 30.2456,
    "from_coords": [
      30.2456,
	  50.401
    ],
    "target_lat": 48.697,
    "target_lon": 21.0956,
    "to_coords": [
      21.0956,
	  48.697
    ],
    "population": 46838,
    "Linewidth": 3.84975769491258,
    "inbound": 255,
    "outbound": 65025
  },
  {
    "origin": "Ukraine",
    "destination": "Hungary",
    "label": "Ukraine-Hungary",
    "source_lat": 50.401,
    "source_lng": 30.2456,
    "from_coords": [
      30.2456,
	  50.401
    ],
    "target_lat": 47.48,
    "target_lon": 18.8432,
    "to_coords": [
      18.8432,
	  47.48
    ],
    "population": 89561,
    "Linewidth": 7.3612910225472,
    "inbound": 255,
    "outbound": 65025
  },
  {
    "origin": "Ukraine",
    "destination": "Romania",
    "label": "Ukraine-Romania",
    "source_lat": 50.401,
    "source_lng": 30.2456,
    "from_coords": [
      30.2456,
	  50.401
    ],
    "target_lat": 45.652,
    "target_lon": 25.5247,
    "to_coords": [
      25.5247,
	  45.652
    ],
    "population": 38461,
    "Linewidth": 3.16122658320237,
    "inbound": 255,
    "outbound": 65025
  },
  {
    "origin": "Ukraine",
    "destination": "Moldova",
    "label": "Ukraine-Moldova",
    "source_lat": 50.401,
    "source_lng": 30.2456,
    "from_coords": [
      30.2456,
	  50.401
    ],
    "target_lat": 46.999,
    "target_lon": 28.7146,
    "to_coords": [
      28.7146,
	  46.999
    ],
    "population": 56064,
    "Linewidth": 4.60807069916689,
    "inbound": 255,
    "outbound": 65025
  }
]


/**
   * Data format:
   * [
   *   {
   *     inbound: 72633,
   *     outbound: 74735,
   *     from: {
   *       name: '19th St. Oakland (19TH)',
   *       coordinates: [-122.269029, 37.80787]
   *     },
   *     to: {
   *       name: '12th St. Oakland City Center (12TH)',
   *       coordinates: [-122.271604, 37.803664]
   *   },
   *   ...
   * ]
   */

// DeckGL react component
function App() {

  // https://deck.gl/docs/developer-guide/interactivity
  const [viewState, setViewState] = useState({
    longitude: 22.937,
    latitude: 50.791,
    zoom: 5,
    maxZoom: 15,
    pitch: 30,
    bearing: 0
  });


  // const layers = [
  //   new LineLayer({id: 'line-layer', data})
  // ];

  const layer = new ArcLayer({
    id: 'arc-layer',
    data,
    pickable: true,
    getWidth: d => d.Linewidth,
    getSourcePosition: d => d.from_coords,
    getTargetPosition: d => d.to_coords,
    getSourceColor: d => [Math.sqrt(d.inbound), 140, 0],
    getTargetColor: d => [Math.sqrt(d.outbound), 140, 0],
  });

  return (
    <DeckGL
      viewState={viewState}
      onViewStateChange={e => setViewState(e.viewState)}
      controller={true}
      layers={layer}
      getTooltip={({object}) => object && `${object.origin} to ${object.destination}`}
    >
      <Map 
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN} 
      />
    </DeckGL>
  );
}

export default App;