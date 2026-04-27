var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

fetch('data/hotel.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(d => {

      var marker = L.marker([d.lat, d.lng], { icon: blueIcon })
        .addTo(map);

      var googleMapsUrl = `https://www.google.com/maps?q=${d.lat},${d.lng}`;

      marker.bindPopup(`
        <b>🏨 ${d.nama}</b><br>
        <a href="${googleMapsUrl}" target="_blank">
          📍 Buka di Google Maps
        </a>
      `);
    });
  });