// Inisialisasi peta
const map = L.map('map').setView([4.6951, 96.7494], 7);

// Tambahkan peta dasar OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Definisikan ikon hotel
const hotelIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/139/139899.png', // Ikon hotel
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// Load data GeoJSON hotel
fetch("Hotel.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        let name = feature.properties.name || "Hotel tanpa nama";
        let operator = feature.properties.operator || "Operator tidak diketahui";
        let popupContent = `<strong>${name}</strong><br>Operator: ${operator}`;

        // Jika bukan Point, ambil center dan tambahkan marker manual
        if (feature.geometry.type !== "Point") {
          try {
            let bounds = layer.getBounds();
            let center = bounds.getCenter();
            L.marker(center, { icon: hotelIcon }).addTo(map).bindPopup(popupContent);
          } catch (e) {
            console.warn("Gagal mengambil center dari geometry:", e);
          }
        } else {
          layer.bindPopup(popupContent);
        }
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: hotelIcon });
      },
      style: {
        color: "#3399ff", 
        weight: 2
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error("Gagal memuat data hotel:", error);
  });

  