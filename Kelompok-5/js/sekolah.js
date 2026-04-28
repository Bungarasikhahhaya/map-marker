var blueIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
	shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41]
});

fetch('data/sekolah.json')
	.then(function (res) {
		if (!res.ok) {
			throw new Error('Gagal memuat data sekolah');
		}

		return res.text();
	})
	.then(function (text) {
		if (!text.trim()) {
			return [];
		}

		return JSON.parse(text);
	})
	.then(function (data) {
		data.forEach(function (s) {
			var marker = L.marker([s.lat, s.lng], { icon: blueIcon })
				.addTo(map);

			var googleMapsUrl = 'https://www.google.com/maps?q=' + s.lat + ',' + s.lng;

			marker.bindPopup(
				'<b>🏫 ' + s.nama + '</b><br>' +
				'<a href="' + googleMapsUrl + '" target="_blank">' +
					'📍 Buka di Google Maps' +
				'</a>'
			);
		});
	})
	.catch(function (error) {
		console.error('Tidak bisa menampilkan data sekolah:', error);
	});