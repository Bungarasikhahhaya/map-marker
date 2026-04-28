var hotelIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

var homestayIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/619/619034.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

fetch('data/hotel.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(d => {

      var iconDipakai;

      if (d.tipe === "hotel") {
        iconDipakai = hotelIcon;
      } else if (d.tipe === "homestay") {
        iconDipakai = homestayIcon;
      }

      var marker = L.marker([d.lat, d.lng], { icon: iconDipakai })
        .addTo(map);

      var googleMapsUrl = `https://www.google.com/maps?q=${d.lat},${d.lng}`;

      marker.bindPopup(`
        <b>${d.tipe === "hotel" ? "🏨" : "🏡"} ${d.nama}</b><br>
        <a href="${googleMapsUrl}" target="_blank">
          📍 Buka di Google Maps
        </a>
      `);
    });
  });