function parseJSON() {
    fetch('sfcrimes.json')
    .then(res => res.text())
    .then(data => console.log(JSON.parse(data)[0].Latitude));
}

parseJSON();