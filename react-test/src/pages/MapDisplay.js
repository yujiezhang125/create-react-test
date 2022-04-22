import React, { useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

import mapboxgl from "mapbox-gl";
import FilterForm from "./FilterForm";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

// mapbox token
mapboxgl.accessToken =
  "pk.eyJ1IjoieXVqaWV6aGFuZzEyNSIsImEiOiJja3Ztb2I4bDMzNHV4MnVxZnFhNG5sZDIyIn0.8MKp_jRj8QSo5B_uMmbMZg";
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyADhROQjGTctSTnuN0Q3XeapJ39K46ZFMk",
  authDomain: "lostandfound-e9912.firebaseapp.com",
  databaseURL: "https://lostandfound-e9912-default-rtdb.firebaseio.com",
  projectId: "lostandfound-e9912",
  storageBucket: "lostandfound-e9912.appspot.com",
  messagingSenderId: "971455276252",
  appId: "1:971455276252:web:0c65479f9b70e22f67c019",
};
// initialize
const app = initializeApp(firebaseConfig);

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-118.2868);
  const [lat, setLat] = useState(34.0227);
  const [zoom, setZoom] = useState(14.7);
  const [itemColor, setItemColor] = useState("N/A");
  const [itemType, setItemType] = useState("N/A");
  const [itemDate, setItemDate] = useState("N/A");
  const [itemDescription, setItemDescription] = useState("N/A");
  const [itemID, setItemID] = useState('0bfac146-1084-4001-8fe6-d5109eb1e2fe');

  // add points end
  useEffect(() => {
    // read database
  const dbRef = ref(getDatabase());
  var foundItemsJson = {
    type: "FeatureCollection",
    features: [
      // {
      // 'type': 'Feature',
      // 'geometry': {
      //   'type': 'Point',
      //   'coordinates': [-118.28950976870416,  34.02067638715009]
      //   },
      //   'properties': {
      //     'id': 101,
      //     'type': 'Key',
      //     'color': 'Red',
      //     'date': '2022.3.15',
      //     'description': 'A red key was found at Olin Hall, classroom 134',
      //     'icon': 'marker'
      //   }
      // }
    ],
  };

  get(child(dbRef, `Found_items/`)).then((snapshot) => {
    // console.log(snapshot.val());
    const foundItems = snapshot.val();

    var feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-118.28950976870416, 34.02067638715009],
      },
      properties: {
        id: 101,
        type: "Key",
        color: "Red",
        date: "2022.3.15",
        description: "A red key was found at Olin Hall, classroom 134",
        icon: "marker",
      },
    };
    Object.keys(foundItems).forEach(function (key) {
      // console.log(key, foundItems[key]);
      const itemInfo = foundItems[key];

      feature.geometry.coordinates[0] = itemInfo.location.Longitude;
      feature.geometry.coordinates[1] = itemInfo.location.Latitude;

      feature.properties.id = key;
      feature.properties.type = itemInfo.item_name;
      feature.properties.color = itemInfo.color;
      feature.properties.date = itemInfo.date;
      feature.properties.dexcription = itemInfo.description;

      console.log(itemInfo.color, itemInfo.item_name, itemInfo.location.Longitude, itemInfo.location.Latitude)
      foundItemsJson.features.push(JSON.parse(JSON.stringify(feature)));
    });

    console.log(foundItemsJson);
  });

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // add points
    map.current.on("load", () => {
      // Add the points data as a source.
      // console.log(foundItemsJson);
      map.current.addSource("points", {
        type: "geojson",
        data: foundItemsJson,
      });

      map.current.addLayer({
        id: "testLayer",
        source: "points",
        type: "circle",
        paint: {
          // "circle-color": "#FF0000",
          // "circle-radius": 10,
          "circle-color": "#4264fb",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
        // "type": "symbol",
        // 'layout': {
        //   'icon-image': '{icon}',
        //   'icon-allow-overlap': true
        //   }
      });

      map.current.on("click", "testLayer", function (e) {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML("<b>Item Description:</b> <br/>" + description)
          .addTo(map.current);

        const item = e.features[0].properties;
        setItemColor(item.color);
        setItemType(item.type);
        setItemDate(item.date);
        setItemDescription(item.description);
        setItemID(item.id);
      });

      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.current.on("mouseenter", "testLayer", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        // const description = e.features[0].properties.description;

        const description =
          "<b>Item Color:</b> " +
          e.features[0].properties.color +
          "<br/>" +
          "<b>Item Type:</b> " +
          e.features[0].properties.type;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
      });

      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "testLayer", () => {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    // 点击事件获取经纬度
    // map.current.on("click", function (e) {
    //   console.log(e.point);
    //   console.log(e.lngLat);
    // });
  });

  

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-118.2868);
  // const [lat, setLat] = useState(34.0227);
  // const [zoom, setZoom] = useState(14.7);
  // const [itemColor, setItemColor] = useState("N/A");
  // const [itemType, setItemType] = useState("N/A");
  // const [itemDate, setItemDate] = useState("N/A");
  // const [itemDescription, setItemDescription] = useState("N/A");
  // const [itemID, setItemID] = useState("12345");

  // // add points end
  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });

  //   // add points
  //   map.current.on("load", () => {
  //     // Add the points data as a source.
  //     const geojson = {
  //       type: "FeatureCollection",
  //       features: [
  //         {
  //           type: "Feature",
  //           geometry: {
  //             type: "Point",
  //             coordinates: [-118.28950976870416, 34.02067638715009],
  //           },
  //           properties: {
  //             id: 101,
  //             type: "Key",
  //             color: "Red",
  //             date: "2022.3.15",
  //             description: "A red key was found at Olin Hall, classroom 134",
  //             icon: "marker",
  //           },
  //         },
  //         {
  //           type: "Feature",
  //           geometry: {
  //             type: "Point",
  //             coordinates: [-118.28290498660579, 34.02176003995943],
  //           },
  //           properties: {
  //             id: 102,
  //             type: "Backpack",
  //             color: "Blue",
  //             date: "2022.3.28",
  //             description:
  //               "A blue backpack was found at Leavey Library 3rd floor",
  //             icon: "marker",
  //           },
  //         },
  //       ],
  //     };

  //     // for循环筛选geojson
  //     // const geojson_filtered = {
  //     //   'type': 'FeatureCollection',
  //     //   'features': []
  //     // }
  //     // for (let i = 0; i < geojson.features.length; i++) {
  //     //   const obj = geojson.features[i];
  //     //   const color = geojson.features[i].properties.color;
  //     //   console.log(color);
  //     //   if (color == 'red') {
  //     //     geojson_filtered.features.push(obj);
  //     //   }
  //     // }

  //     map.current.addSource("points", {
  //       type: "geojson",
  //       data: geojson,
  //     });

  //     map.current.addLayer({
  //       id: "testLayer",
  //       source: "points",
  //       type: "circle",
  //       paint: {
  //         // "circle-color": "#FF0000",
  //         // "circle-radius": 10,
  //         "circle-color": "#4264fb",
  //         "circle-radius": 8,
  //         "circle-stroke-width": 2,
  //         "circle-stroke-color": "#ffffff",
  //       },
  //       // "type": "symbol",
  //       // 'layout': {
  //       //   'icon-image': '{icon}',
  //       //   'icon-allow-overlap': true
  //       //   }
  //     });

  //     map.current.on("click", "testLayer", function (e) {
  //       const coordinates = e.features[0].geometry.coordinates.slice();
  //       const description = e.features[0].properties.description;

  //       new mapboxgl.Popup()
  //         .setLngLat(coordinates)
  //         .setHTML("<b>Item Description:</b> <br/>" + description)
  //         .addTo(map.current);

  //       const item = e.features[0].properties;
  //       setItemColor(item.color);
  //       setItemType(item.type);
  //       setItemDate(item.date);
  //       setItemDescription(item.description);
  //     });

  //     // Create a popup, but don't add it to the map yet.
  //     const popup = new mapboxgl.Popup({
  //       closeButton: false,
  //       closeOnClick: false,
  //     });

  //     // Change the cursor to a pointer when the mouse is over the places layer.
  //     map.current.on("mouseenter", "testLayer", (e) => {
  //       map.current.getCanvas().style.cursor = "pointer";

  //       const coordinates = e.features[0].geometry.coordinates.slice();
  //       // const description = e.features[0].properties.description;

  //       const description =
  //         "<b>Item Color:</b> " +
  //         e.features[0].properties.color +
  //         "<br/>" +
  //         "<b>Item Type:</b> " +
  //         e.features[0].properties.type;

  //       // Populate the popup and set its coordinates
  //       // based on the feature found.
  //       popup.setLngLat(coordinates).setHTML(description).addTo(map.current);
  //     });

  //     // Change it back to a pointer when it leaves.
  //     map.current.on("mouseleave", "testLayer", () => {
  //       map.current.getCanvas().style.cursor = "";
  //       popup.remove();
  //     });
  //   });

  //   // 点击事件获取经纬度
  //   // map.current.on("click", function (e) {
  //   //   console.log(e.point);
  //   //   console.log(e.lngLat);
  //   // });
  // });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on("move", () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });


  return (
    <div>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      {/* <div>
            Item Color: {itemColor} <br/>
            Item Type: {itemType} <br/>
            Found Date: {itemDate} <br/>
            Item Description: {itemDescription}
          </div> */}
      <div align="center">
        <table border="1" className="itemInformation">
          {/* <tr>
                <th>Month</th>
                <th>Savings</th>
              </tr> */}
          <tr>
            <td>Item Color</td>
            <td>{itemColor}</td>
          </tr>
          <tr>
            <td>Item Type</td>
            <td>{itemType}</td>
          </tr>
          <tr>
            <td>Found Date</td>
            <td>{itemDate}</td>
          </tr>
          <tr>
            <td>Item Description</td>
            <td>{itemDescription}</td>
          </tr>
        </table>

        <button className="declareButton">
          <NavLink to={{ pathname: "/declarepage/" + itemID }}>
            {" "}
            Declare{" "}
          </NavLink>
        </button>
      </div>

      {/* <FilterForm /> */}
    </div>
  );
}
