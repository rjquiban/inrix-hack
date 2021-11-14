function parseJSON() {
    fetch('sfcrimes.json')
    .then(res => res.text())
    .then(data => {
        crimes = JSON.parse(data);
        console.log(crimes.filter(crime => (crime.Latitude==37.735803252595595 && crime.Longitude==-122.38342544658873)));
    });
}

parseJSON();