const map = L.map('radar').setView([50.45, 30.52], 10); // Київ
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

