// Load the SheetJS library
const XLSX = require('xlsx');

// Load the Excel sheet
const workbook = XLSX.readFile('data.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Define the region to highlight on the map
const region = {
  name: 'Karnataka',
  coordinates: [
    [12.6015, 74.774],
    [14.8982, 74.774],
    [14.8982, 78.4041],
    [12.6015, 78.4041],
  ],
};

// Get the data for the region from the Excel sheet
const data = {};
XLSX.utils.sheet_to_json(worksheet).forEach((row) => {
  if (row.State === region.name) {
    data[row.District] = row.Population;
  }
});

// Color the region on the map based on the data
const map = L.map('map').setView([21.7679, 78.8718], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors',
  maxZoom: 18,
}).addTo(map);
const polygon = L.polygon(region.coordinates, {
  color: 'red',
  fillColor: 'red',
  fillOpacity: 0.5,
}).addTo(map);
polygon.bindPopup(`<b>${region.name}</b><br>Population: ${data[region.name]}`);
