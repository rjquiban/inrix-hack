var mymap = L.map('map').setView([37.757, -122.441], 13);   //sets initial viewport to San Francisco

// tile layer for map overlay
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicmpxdWliYW4iLCJhIjoiY2t2eWR1bWdmY3g5bzJwcGd1NDF2am4wciJ9.pUcq2dVIsskiicxBd57SKg'
}).addTo(mymap);

//hardcoded route lines of geojson object
var myLines = [{
    "type": "LineString",
    "coordinates": [[
        -122.4587631225586,
        37.7627084265813
      ],
      [
        -122.4232292175293,
        37.77193596411837
      ],
    ]
}];

L.geoJSON(myLines).addTo(mymap);  //adding route lines to map

// pre: 
// post: 
function getInputCoords() {
    var startCoords = {
        lat: document.getElementById("latInputStart").value,
        long: document.getElementById("longInputStart").value,
    }

    var endCoords = {
        lat: document.getElementById("latInputEnd").value,
        long: document.getElementById("longInputEnd").value,
    }

    console.log("start coords: [" + startCoords.lat + " , " + startCoords.long + "]");
    console.log("end coords: [" + endCoords.lat + " , " + endCoords.long + "]");
}

