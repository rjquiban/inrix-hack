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
    startCoords.lat = document.getElementById("latInputStart").value;
    startCoords.long = document.getElementById("longInputStart").value;
    endCoords.lat = document.getElementById("latInputEnd").value;
    endCoords.long = document.getElementById("longInputEnd").value;

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

    mymap.setZoomAround([startCoords.lat, startCoords.long], 16);
}

// pre: assumes passed in valid start and end coordinates
// post: makes api call and gets JSON coordinates
function getRoutes(startLat, startLong, endLat, endLong) {
    // fetch('https://api.iq.inrix.com/findRoute?wp_1=37.770581%2C-122.442550&wp_2=37.765297%2C-122.442527&maxAlternates=2&useTraffic=true&units=1&routeOutputFields=B,M,P,S,W&isAmbiguousOrigin=true&format=json', {

    fetch(`https://api.iq.inrix.com/findRoute?wp_1=${startLat}%2C${startLong}&wp_2=${endLat}%2C${endLong}&maxAlternates=2&useTraffic=true&units=1&routeOutputFields=B,M,P,S,W&isAmbiguousOrigin=true&format=json`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6ImFtY3Uxemh4bjQiLCJ0b2tlbiI6eyJpdiI6IjM4OGI3MmU1YTU3YTliNmU3NWQ2YWFlODEzMjdiMTc4IiwiY29udGVudCI6Ijg3YTQ3MjIyYTQwZWRjZTYxMDJmNjQ4MDQ4MjZlZTJiYTIxNzM2MmVkY2NlYTNjNTgwNzMwOTg0ZTQxMjg0ZTY0ZDlkY2EzOGZlNzE0ODhjMDY3MGU0ODdkYzE5MmU1ZjhlM2Q2Y2Q3NjBiNWQ3Y2IzODQ1MmUyYWM5ODBjNDg1YTRiNzM3YTM4ZTc4N2EzOTAyNjBiYWYxMzg3NTc2NTY0ZDRjYWQ0NGJkMDgzY2E1ZTdiNzVjOGY0MjllOTUxYmZjOThmYjMyYjEzYzI1ZjVmZDcyZDg4MjIyNWUzNTFkNzY4NGIwOGQwN2M3NTNlZjgxMDEwNTYzNDVjY2UwMTY1MDA0ZmJhZmYwOTE5OTMxMzZlYmY4YWMzZWE3YzEyOWVmYThiMDhkYzIxZTEwMTZiYWMyNDY4M2VjYjg3OGQ0NzExODMxOTI1ZDk3Yzc3MDNmY2RlNWNlMWNjOTk1ZTI3MzY4YzBmMzEyZjJjMjUzNjYxNmFhNWJlZGIwN2JkODI4NTU1NDAwMjVlZDc0ZGU5YWM2NTYwYmIzZGNjNTVmMWQyMTUyMTY2MjYzNDAzN2NhN2VjNmQyMzUyOTkwYWFiMzhmNTZlODk0ZDFiNzA4NWI4NTk3NzBhNjBjOGRiNTEyZmMyMTU1ODEyNTdkN2NlY2Q3N2RmZTUwMDQyNjRhODRlYjdjNDFiMzY5ZWM2NTZlYjA4NTY0YzZjNjFhNWUzMzQ5MjRmMzkwZDgzMzgwMGRiODZhZDVlMmFiY2M3ZDk5M2E4OTJjYTE3MGI5NDhkYTgwZmExYTAwODA2ZjA3YzdjYmIyZjczZjJmZjAwOGM5YzI1ZDA3NDQ0N2ViZTdkYTU2NWUwNmI1ODVhNjNkMmJkMzIyIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiIzODhiNzJlNWE1N2E5YjZlNzVkNmFhZTgxMzI3YjE3OCIsImNvbnRlbnQiOiI4Nzk5NzkwNmY3NzBkMGJjMmQwYzQ4OWQ3MzJjZDMzNzk1MDczMzE4ZWM4ZGEyOTU4MTUxM2FlNTg3MDA4N2ZmNzA5YmYxNzlhNjI2N2ViMTI0NTBjM2I5In0sImp0aSI6ImQ1ODRlYjI2LWUzZWEtNGNjOS1iYzcxLTIzY2Q1ZWI2YjY1NSIsImlhdCI6MTYzNjg3OTIwMSwiZXhwIjoxNjM2ODgyODAwfQ.zKlM1mN_bkL8_mdjboaqxYIkYC_2CgLRhcjWuJLcjVo'
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
        parseJSON();
    });   
}

// pre: takes in 3 coordinate objects
// post: creates geojson objects and plots routes on maps
function mapRoutes(safe1, safe2, safe3) {
    var myLines = [{
        "type": "LineString",
        "coordinates": safe1,
    }, {
        "type": "LineString",
        "coordinates": safe2,
    }, {
        "type": "LineString",
        "coordinates": safe3,
    }];

    var redLine = {"color": "#cc2121"};
    var yellowLine = {"color": "#f2b200"};
    var greenLine = {"color": "#0e9941"};

    //adding route lines to map
    L.geoJSON(myLines[2], {
        style: redLine,
        weight: 5,
    }).addTo(mymap); 
    L.geoJSON(myLines[1], {
        style: yellowLine,
        weight: 5,
    }).addTo(mymap); 
    L.geoJSON(myLines[0], {
        style: greenLine,
        weight: 8,
    }).addTo(mymap); 
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

        // if(r1Sum == r2Sum || r2Sum == r3Sum || r1Sum == r3sum) {

        // }

        // pass sums to function that evaluates routes
        mapRoutes(r1, r2, r3);

        console.log("Route 1 Incident Sum: "+ r1Sum + "\nRoute 2 Incident Sum: " + r2Sum + "\nRoute 3 Incident Sum: " + r3Sum);
    });
}

// Aaron/Jodi --> returns integers (string) of cars per route
// function that evaluates routes based on
    // 1) # of crimes
    // 2) # of cars (used to determine ties between routes that have equal incident reports)
    // pass in routes from most safe to least safe 
    // mapRoutes();
// color routes based on evaluation

// function rankRoutes()
