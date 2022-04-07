import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = 'pk.eyJ1IjoieXVqaWV6aGFuZzEyNSIsImEiOiJja3Ztb2I4bDMzNHV4MnVxZnFhNG5sZDIyIn0.8MKp_jRj8QSo5B_uMmbMZg';


export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-118.2868);
    const [lat, setLat] = useState(34.0227);
    const [zoom, setZoom] = useState(14.7);

    

    // add points end
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });

        // add points
        map.current.on('load', () => {
          // Add the points data as a source.
          const geojson = {
            'type': 'FeatureCollection',
            'features': [
              {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [-118.28950976870416,  34.02067638715009]
                },
                'properties': {
                  'description': 'Olin Hall description',
                  'icon': 'marker'
                }
              }, 
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [-118.28290498660579,  34.02176003995943]
                  },
                  'properties': {
                    'description': 'Leavey Library description',
                    'icon': 'marker'
                  }
                }
            ]
            }
          map.current.addSource('points', {
            'type': 'geojson',
            'data': geojson
            });
          
          map.current.addLayer({
            "id": "testLayer",
            "source": 'points',
            "type": "circle",
            "paint": {
                // "circle-color": "#FF0000",
                // "circle-radius": 10,
                'circle-color': '#4264fb',
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
                }
            // "type": "symbol",
            // 'layout': {
            //   'icon-image': '{icon}',
            //   'icon-allow-overlap': true
            //   }
          });

          map.current.on('click','testLayer', function(e) {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map.current);
          })

          // Create a popup, but don't add it to the map yet.
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
            });
          
          // Change the cursor to a pointer when the mouse is over the places layer.
          map.current.on('mouseenter', 'testLayer', (e) => {
            map.current.getCanvas().style.cursor = 'pointer';

            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
          });
          
          // Change it back to a pointer when it leaves.
          map.current.on('mouseleave', 'testLayer', () => {
            map.current.getCanvas().style.cursor = '';
            popup.remove();
          });

        })
        
        // 点击事件获取经纬度
        map.current.on('click', function(e) {
          console.log(e.point);
          console.log(e.lngLat);
        })
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
          setLng(map.current.getCenter().lng.toFixed(4));
          setLat(map.current.getCenter().lat.toFixed(4));
          setZoom(map.current.getZoom().toFixed(2));
        });
      });



    return (
        <div>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>
      );
}