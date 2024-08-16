//const map = L.map('map').setView([51.505, -0.09], 13); // Center on London by default

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //maxZoom: 19
//}).addTo(map);

//map.on('click', function(e) {
  //const lat = e.latlng.lat;
  //const lng = e.latlng.lng;
  //document.getElementById('sidebar').innerHTML = `Lat: ${lat}<br>Lng: ${lng}`;
//});
//map.on('click', function(e) {
  //  const lat = e.latlng.lat;
    //const lng = e.latlng.lng;
    // Placeholder for detailed info; replace with actual data fetching if needed
    //document.getElementById('sidebar').innerHTML = `<h2>Location Information</h2><p>Latitude: ${lat}<br>Longitude: ${lng}</p>`;
  //});


  const map = L.map('map').setView([51.505, -0.09], 13); // Center on London by default

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

map.on('click', function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  // Reverse Geocoding Request to Nominatim
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
    .then(response => response.json())
    .then(data => {
      const address = data.address;
      const city = address.city || address.town || address.village || 'N/A';
      const area = address.suburb || address.neighborhood || 'N/A';
      const postalCode = address.postcode || 'N/A';
      const country = address.country || 'N/A';

      // Display detailed information in the sidebar
      document.getElementById('sidebar').innerHTML = `
        <h2>Location Information</h2>
        <p>Latitude: ${lat}</p>
        <p>Longitude: ${lng}</p>
        <p>City: ${city}</p>
        <p>Area: ${area}</p>
        <p>Zip Code: ${postalCode}</p>
        <p>Country: ${country}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching location data:', error);
      document.getElementById('sidebar').innerHTML = `<p>Error fetching location data.</p>`;
    });
});
