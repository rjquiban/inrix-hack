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

var startCoords = {
    lat: '',
    long: '',
}
var endCoords = {
    lat: '',
    long: '',
}

// Three route array of coordinates
var r1 = [];
var r2 = [];
var r3 = [];

document.getElementById('coordSubmit').addEventListener('click', getInputCoords);
// pre: assumes user input passed into HTML form
// post: takes user input of latitude and longitude start and end coordinates, plots
//       markers, calles next function
function getInputCoords() {
    console.log('button pressed!');
    // var startCoords = {
    //     lat: document.getElementById("latInputStart").value,
    //     long: document.getElementById("longInputStart").value,
    // }

    // var endCoords = {
    //     lat: document.getElementById("latInputEnd").value,
    //     long: document.getElementById("longInputEnd").value,
    // }

    startCoords.lat = document.getElementById("latInputStart").value;
    startCoords.long = document.getElementById("longInputStart").value;

    //TODO: get rid of this
    startCoords.lat = 37.770581;
    startCoords.long = -122.442550;

    endCoords.lat = 37.765297;
    endCoords.long = -122.442527;

    getRoutes(startCoords.lat, startCoords.long, endCoords.lat, endCoords.long);

    console.log("start coords: [" + startCoords.lat + " , " + startCoords.long + "]");
    console.log("end coords: [" + endCoords.lat + " , " + endCoords.long + "]");

    //adding start and end markers
    var startMarker = L.marker([startCoords.lat, startCoords.long]).addTo(mymap);
    var endMarker = L.marker([endCoords.lat, endCoords.long]).addTo(mymap);
}

// pre: assumes passed in valid start and end coordinates
// post: makes api call and gets JSON coordinates
function getRoutes(startLat, startLong, endLat, endLong) {
    // fetch('https://api.iq.inrix.com/findRoute?wp_1=37.770581%2C-122.442550&wp_2=37.765297%2C-122.442527&maxAlternates=2&useTraffic=true&units=1&routeOutputFields=B,M,P,S,W&isAmbiguousOrigin=true&format=json', {

    fetch(`https://api.iq.inrix.com/findRoute?wp_1=${startLat}%2C${startLong}&wp_2=${endLat}%2C${endLong}&maxAlternates=2&useTraffic=true&units=1&routeOutputFields=B,M,P,S,W&isAmbiguousOrigin=true&format=json`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InhzMmo4dzJ4bTMiLCJ0b2tlbiI6eyJpdiI6ImQ4MmQwMjhmMzM0OGE3NjQ2ZjdmZjNmNWU0MzVhYjI3IiwiY29udGVudCI6IjMwZDhiNDRhZTFlZDAwNWI4OTUwY2NmZmQ5MGU2YjJkYTMyNmZhMWFmOWNkYjE2M2Q3NDIwZTM2Nzc1OWEyZTkxNWMyNDRhZjAzOTc5ZWVjMTMwMGEyODM4YjkyMmUxMWU3ZDk4OTQzYjVjOTEzZGUwNjVkMWExMjcyMzlhZGNmZDE4ZjYzMzY5YjA1MWRmMTA1ODI1M2VkZTBlNmE0ZjFjY2M2Y2VjODc1Mjg0ZTZiNWFhMzk1Nzk2MTUyOGI3MWFjYjk1ZmU4Y2IyMDJlMTk4MTVjMTk1Y2U2NjM4YTliOThhZmZiZWVhNWY0MjJlZDk4MzRlZWU4YjdiOTBlOTQ2Yjk4YjYxY2Q2ZTUzZTI4YzM5ZTRhZmE0MWQ0ZTU4YjY1NGFkNWFkMmI4ZjAyYjkwNjgwNzY2YTdiMmY5MDYyZDg0NmRiZjBiMGE3ZmVjZmQ0ZDE0M2RmNjRkMWNlNGUzOGQxMjdhY2MzYzhjOGY4ODMxNGMxZGRkOTRlN2E0NjNmOTQ4Mzc3ZDA4ZDU2ZDg1ODBjNzA2YmE1YzliYjc2MmZiZGZiZWQxN2E4NTMzNWY3YWEyNTIxYWRhMTMxN2E3ZjY3NWEwZTk2MTZmMzg4ODBhN2NhY2ViNDNkZjA4MjlhNWY0ZmQzNWMwYTM2NGI2OTg0N2Q1MjI0MzRkOGM4YjYyOGQxODc3ZjljYjZmMTlmMzFjY2QxM2JlZDQwNzU3ZmQzNzE4OTA5NWQ4NWEyMjY5NzdlMTFjNzc1ZWY0OGI5ZWU4MGZkNDQ4ZWJiYmI5M2E5NTBlNTdiMzk5NWRmYjJiNDlmNjMxMTRjMWFlZDY3YWM3MTI5MDdiMDg0ZmQ1ZGY2NTMzMDJhMDgwNmIyMDI3ZDA5In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJkODJkMDI4ZjMzNDhhNzY0NmY3ZmYzZjVlNDM1YWIyNyIsImNvbnRlbnQiOiIzY2QxYzY2ZGU4ZTUzYTA2YTEwZmQxOWNkYzEyNmEyYTgwM2Y5ZTIwYzhmMDk2NjJkYTYwMWU3OTU4MWY4MGU1NzZkNDQ0YTQxZDg2ZDZmMzJkMzFkMmJkIn0sImp0aSI6IjkxNmJhY2UxLTUxZWItNDc3NS05ZGRmLWM3OGIwNGUyMTY2NiIsImlhdCI6MTYzNjg3NDMxNywiZXhwIjoxNjM2ODc3OTE3fQ.trCkVZdm1mDAEGjEnRLT4PwN6lShLFadqcyySqaz1QA'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        r1 = data.result.trip.routes[0].points.coordinates;
        console.log(r1);
        r2 = data.result.trip.routes[1].points.coordinates;
        console.log(r2);
        r3 = data.result.trip.routes[2].points.coordinates;
        console.log(r3);
        mapRoutes();
    });   
}

// pre: takes in 3 coordinate objects
// post: creates geojson objects and plots routes on maps
function mapRoutes() {
    var myLines = [{
        "type": "LineString",
        "coordinates": r1,
    }, {
        "type": "LineString",
        "coordinates": r2,
    }, {
        "type": "LineString",
        "coordinates": r3,
    }];

    var redLine = {"color": "#cc2121"};
    var blueLine = {"color": "#215acc"};
    var greenLine = {"color": "#0e9941"};

    //adding route lines to map
    L.geoJSON(myLines[0], {
        style: redLine
    }).addTo(mymap); 
    L.geoJSON(myLines[1], {
        style: blueLine
    }).addTo(mymap); 
    L.geoJSON(myLines[2], {
        style: greenLine
    }).addTo(mymap); 

    // Take routes and compare to incident reports
    parseJSON();
}

function parseJSON() {
    fetch('sfcrimes.json')
    .then(res => res.text())
    .then(data => {
        crimes = JSON.parse(data);
        let r1Sum, r2Sum, r3Sum = 0; // Total amount of incidents on each route
        r1.forEach(coord => {
            r1Sum += crimes.filter(crime => (crime.Latitude.substring(0,8)===coord[1].toString().substring(0,8) && crime.Longitude.substring(0,8)===coord[0].toString().substring(0,8))).length; 
        })
        r2.forEach(coord => {
            r2Sum += crimes.filter(crime => (crime.Latitude.substring(0,8)===coord[1].toString().substring(0,8) && crime.Longitude.substring(0,8)===coord[0].toString().substring(0,8))).length; 
        })
        r3.forEach(coord => {
            r3Sum += crimes.filter(crime => (crime.Latitude.substring(0,8)===coord[1].toString().substring(0,8) && crime.Longitude.substring(0,8)===coord[0].toString().substring(0,8))).length; 
        })
        console.log("Route 1 Incident Sum: "+ r1Sum + "\nRoute 2 Incident Sum: " + r2Sum + "\nRoute 3 Incident Sum: " + r3Sum);
    });
}

