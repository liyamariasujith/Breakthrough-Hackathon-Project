export const validLocations = [
  { name: "Amrita Hostel", lat: 12.862, lon: 77.702 },
  { name: "Green Nest Hostel", lat: 12.845, lon: 77.66 },
  { name: "Sunrise Hostel", lat: 17.493, lon: 78.399 },
  { name: "ammatra acdemy", lat: 12.896, lon: 77.67 },
  { name: "SV deluxe pg for ladies", lat: 12.87, lon: 77.65 },
  { name: "PES university", lat: 12.86, lon: 77.66 },
  { name: "BMS collage of engering", lat: 12.93, lon: 77.55 },
  { name: "RVCE", lat: 12.92, lon: 77.5 }
];

export function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}
