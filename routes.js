function getRoutes() {
    fetch('https://api.iq.inrix.com/findRoute?wp_1=37.770581%2C-122.442550&wp_2=37.765297%2C-122.442527&maxAlternates=2&useTraffic=true&units=1&routeOutputFields=B,M,P,S,W&isAmbiguousOrigin=true&format=json', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBJZCI6InhzMmo4dzJ4bTMiLCJ0b2tlbiI6eyJpdiI6ImE2NzEwNzcyN2FhZGU3OTM3NWNjMTIwZDIxYjg0NTFiIiwiY29udGVudCI6IjJjNDg2YmE0YzFlOWU2Mjc1Mzk4YzU3ODZiNjE3Njc5ZWRlZDM5YjI2ZDllODg5MzJmODYyZjJmMWM5MGU5OWUwYTdhODlkMmIxODc2Njg4MzgyNDY2MjkyOWRmODEzYjQ0NjNmODMwYzMzMDkxNTdkMzlmMjRmODU4NDUyMThkNzhiZTViNDRmNzdiZThmYzk3NDY2ZmJiNTQwYTEyMzMwMjFkNTc1MWYwOGY5Zjk5YzcxYWQyNmE3MjZjMWIxZjJkM2YyMzlmNjc0MGQ0MTEzYjE4NjU1ODQ5ZGNiMzM5Zjk2MWViOTA0N2Y3ZTE3NWIzODVkNzVmZjY3MDNmOGYyZDU0OTcyZTViZWQ3N2ZkMGRmM2I0M2M2MzM2YWI1MWMyODdiMDgxNDI3OWQwMjM0N2EwYjBjNTM0ZjMyYTEwNDRhNGUxNWQ2ZDJjNGI4ZTBhODcwMTUxMjQ3M2E0YjIxMzM2NDlkNDE2MDI1NWI3MWI5NmY2YjE0MDFlYmU4NGEzMDMwZmZjNjdhYzM5ZTk3NmQ3ZDNlODlhMGUzYjE1MDkyNjY2NjkzZWYyN2IyYmUxYWM5YWY0ZmMzNjg0ZmRiNTI5YzU2NjAzYTU3MDAwMjJlZmYwM2MxNDI5OWIyOTY5OWZiNDhiYWJkYWJiYzFhNWNiMDVkZDlhZWMwZDIwYTk2Nzg1MjU2ODNiNzZjMTkyNzQ3ODc4NTBlYTA1YWExMDg2ZjQxMDE0NjI0NTRjZTZiNjMyN2I1OWE0ZDNhZjNjOTVhNzM2MzcwMGIwZDM4OGE2ODUwNDI1N2UyZGRhNzAwMmYzN2RkY2FhZTg5ODU1ZjY3YzM3MjdlYzcxZjY2MTZhOWY4ZTM4OWIxOWU4ZDI4MmM5In0sInNlY3VyaXR5VG9rZW4iOnsiaXYiOiJhNjcxMDc3MjdhYWRlNzkzNzVjYzEyMGQyMWI4NDUxYiIsImNvbnRlbnQiOiIwNTA0NmJhMWYwZDdmMzJiNTA5NmNjNWM1MTcxNTkwNTk3ZTMxOTg4MTI5NmJlZjAzNmYwMjAyZDA1OWNkYWVjMDU0ODhiYzFmYWQyNDc5NjM3MzI3ZjE3In0sImp0aSI6IjRmZTU1NGNiLTA2NjctNDE0NC1hOTgzLWRmNzMyMWJkNjcxMyIsImlhdCI6MTYzNjg1MTc0MiwiZXhwIjoxNjM2ODU1MzQyfQ.J67poHJ9efhHk3vrEOBLzNAAOHsyQJchcfvZ3GF5H2g'
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
    });   
}

getRoutes();