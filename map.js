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

// pre: assumes user input passed into HTML form
// post: takes user input of latitude and longitude start and end coordinates, plots
//       markers, calles next function
function getInputCoords() {
    var startCoords = {
        lat: document.getElementById("latInputStart").value,
        long: document.getElementById("longInputStart").value,
    }

    var endCoords = {
        lat: document.getElementById("latInputEnd").value,
        long: document.getElementById("longInputEnd").value,
    }

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
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImFtY3Uxemh4bjQiLCJ0b2tlbiI6eyJpdiI6ImQzYmE2MmI4YTdkN2QwMzY4ZTRlYzkyN2Q4MmRlZmIyIiwiY29udGVudCI6IjBiYTkzMzIwY2JjOWExNjQ0ZmI3MWIwNzI2M2MwZGE2ZGYyM2RhNDU3NjgxMzUxZjAxOTNjNzZiNjI5NmNmY2U2Njc2NDAxYzRiY2VmY2YwM2JiYTcwYWQ1NjFlOGM4YTM1Njg5ZmUyOTk4MDQ0MTUzNjFmMmNjZjRmZTU3NmY4N2JlYTI2YTM5ZWI3MDk5YmQ0ZmJmMDMxYjg5MTg3ZGViZTE2NThkZjRhZmJmODhmOTgwM2FkODk2NDA1OGU0YWZkYTZlNDNkNTNlNmMwOTJiZGUzNzVhMWJmYmM5YWU1ZGQ2YTYxMjg5MWM0MTQ5ODJkOTRiNTZhZDY1YzE5NDZhOGVkYjlkN2EyMjkwODNjY2RmYzQ5OTA5OGM3OTM3NzVkZTM0MWE5ZTdlNWYzMDAwNzI1MDExMGU2NDRhYzY4YWU0Mzc2MGI5MjFhZDgwMDRjMmI3YjAxOTQxNzkzMzUxZDFlYjc0OTlhOTllNDFhMjQ1N2IxZjU4ZjI2MzE2ZWU5ZDIwZmI2Yzk4NzY2MDYyZTk2N2JiZjU2YWE1OTM0YzlkY2U5ZGNlNzI4NWJiYWI3NDhhNjJjNDA3MTM3MjJhOTdmMDZlNmM1YmNmYWEwMWYxZDk2MjRkOTM5ZDE3YWY2Zjk5M2JhOWQxNWEyYmJjZjZlNmU3ZjZjMzJkOTZlZWY3YTQ0ZGM0NzFmNmQwMGQ3MDk3MDcxMzEwODJhNzU5YjVhMWM1YmI2NDZiYzNlNDU0N2Y1NTk0MGYyYzNiZDFiZmE2NWM2Mzc5YjA4OWUzMzM3MTg1MjJjMzE3Yzc5ZGQwYTZlNjI0NmRhYmY3MTU1OTgxY2ViYTlmZTM4MTkzMWM4MTAwMTk5M2MwNGEwNjc2NjQxIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJkM2JhNjJiOGE3ZDdkMDM2OGU0ZWM5MjdkODJkZWZiMiIsImNvbnRlbnQiOiIxNjkzMWUyYTkxZmY4OTM5NjJiNDYwMDgyNTNmNzFkMWU2NzNkNTVjMDk4YTA2MWMyOWUzZmYzYTU4OTlmNmVmNjcwZDNhNTQzZmRhYzBkODM3YTg1NzkzIn0sImp0aSI6ImJkMTgzY2E4LTM1MzEtNDY4OC05MDQyLTg4YzFlYzQyOWE5YSIsImlhdCI6MTYzNjg1NjA2OCwiZXhwIjoxNjM2ODU5NjY3fQ.b_5Aa5CALjakigqvM3v8n2048UvlUoNRAxxFg8-s_Ek'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const route1Points = data.result.trip.routes[0].points.coordinates;
        console.log(route1Points);
        const route2Points = data.result.trip.routes[1].points.coordinates;
        console.log(route2Points);
        const route3Points = data.result.trip.routes[2].points.coordinates;
        console.log(route3Points);
        mapRoutes(route1Points, route2Points, route3Points);
    });   
}

// pre: takes in 3 coordinate objects
// post: creates geojson objects and plots routes on maps
function mapRoutes(r1, r2, r3) {
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
}
