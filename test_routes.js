function getRoutes(){
    var routes;

    fetch("https://api.iq.inrix.com/findRoute?wp_1=37.770581%2C-122.442550&wp_2=37.765297%2C-122.442527&maxAlternates=2&useTraffic=true&units=1&routeOutputFields=B,M,P,S,W&isAmbiguousOrigin=true&format=json", {
        method: 'GET', 
        headers: {
            'accept': 'application/json, text/plain, */*',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6IjJ0dGx1Z25zdDAiLCJ0b2tlbiI6eyJpdiI6ImIyMTQ4MWUxOTczN2U1NzU1MTJmOTIzNTZjOTY2OTI3IiwiY29udGVudCI6IjhjZTU3MDc1MDZjZThhYTg1Y2JhMjRkN2M2ZTNiMzYxZTY3MDUxZGQyZmUwNGY1ZDE0OWI1ZTFmODIwMGVkMGIxNmZmMTVlMDI2ZjA3MTBmNDk3YTdjZmIyOWYxMTFhZGE3YjMyNzQ3MjZkZjMxNGQ2OGE1MGY3NGMxMjY3MjkwZjY3NGFkYmI5MDQwM2FkNTNiNjczODY4OGM0YzIyNTVjNzRlYjE1MGY2YTdiNjhjMmE5NDJkYTc0MzVkYzZiOWQ4NTZiYTlmYTBhNjhhZDUzMDJmYzVjM2FlMzcwZDZjNmQzOTBmYjdiNmNlNTA2MDkxNDU2ZDVjNjA5MWE2N2RkMzY0MTdlYWQ3YmI5ZWQyZjI5ZDVhOWEwNTJjYjgxNDhhMjgwYTM5NTI3YTQzYmQ5YTJkOTI5NDJjYTIzOTQyNzY4NzQzNTkyMmNhYjlkNWJjZTFlYmExMzBmZTdmZDczYTU4MzE3YWUwZGUxMTY0MDc4M2QxYjMwNjg4N2QzOTcyNmMyOTRlYzNmN2NhZGNmMTk3NWRiOWQxOTYyNDlmODVjOTVlY2RiOTRkYTM1M2I5ZDRlMTQwOGFlNWZhOTZmZTZkMDc5NzAyY2FmOWM1NWVkNGRmYmQ2OTY5NDg2ZmY0NDU3YWE3YzFlNTFlMGYxM2ZmZjU0MTUwMGM3ODRlY2I4ZDk5NDJjNjQ4MGQzMGRkNGJhYzNhMTk5OGQwNDhmNGYxMGJlY2QzYmM0ZGNmNjcwZDY3NmMxN2FkZGJlNDEzYjk4YjA0MzVkMzRmMjI3ZWM0MDM1MzIxY2E1MDA3MDdjNzE5N2Y2MGEwNGI4ZDQwYjdhZWU5YzhhNmRlOTI1MWUyZjdhMjE0Mjk3MzE5YWZjODllIn0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJiMjE0ODFlMTk3MzdlNTc1NTEyZjkyMzU2Yzk2NjkyNyIsImNvbnRlbnQiOiJjNGZlMDk0NzI4Y2JjMzk2N2JhNjI0YWNkZmY1OTUzOWM5NmM3Y2RhMjJlZDQ0MDkxMjk0NTU1M2Y4MGFjZjI2MTljNjBjZWEzMWQ2NmYwNjRhNDE3MWM1In0sImp0aSI6ImE2NzE3YTk5LWZjNzItNDM1NC04NjM0LWNmNGY4YjZkOGVhNyIsImlhdCI6MTYzNjg3Njc0OSwiZXhwIjoxNjM2ODgwMzQ5fQ.QVCqmJIqCCXMce5mrBJ3MCc60Ad9iEh8zIi6f7mCBCI'
        }
    })
    //arguments --> arrow to what you want to do with those arguments
    //arguments - what you get from GET method 
    .then((res) => routes = res.json())
    .then((data) => { 
        console.log(data);
        routes = data;
        var route1 = []; 
        var route2 = []; 
        var route3 = []; 
        
        route1 = getPoints(route1, 0, routes); 
        route2 = getPoints(route2, 1, routes); 
        route3 = getPoints(route3, 2, routes); 

        printPoints(route1); 
        printPoints(route2); 
        printPoints(route3); 
    })

        return routes; 
}

//can handle 25-30 points - amt div 30 to obtain the appropriate number of points 
function getPoints(array, route_number, data){
    var route_size = data.result.trip.routes[route_number].points.coordinates.length; 
    var increment_val = route_size/30; 
    if (increment_val == 0) increment_val = 1; 
    for (var i = 0; i < route_size; i+=increment_val){
        array.push(data.result.trip.routes[route_number].points.coordinates[i]); 
    }
    return array; 
}
function printPoints(route){
    for (var i = 0; i < route.length; i++){
        console.log(route[i]); 
    }
}
getRoutes(); 