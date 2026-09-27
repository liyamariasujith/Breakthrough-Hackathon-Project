// Seed "database" of known drop points. In production this would come from
// your backend (see the /api/check-location endpoint discussed earlier),
// keyed by real lat/lng instead of hardcoded demo coordinates.
const seedPlaces = [
  { id: 1, name: "Aditya Boys Hostel", type: "hostel", lat: 17.4400, lng: 78.3489 },
  { id: 2, name: "Sunrise PG for Girls", type: "pg", lat: 17.4450, lng: 78.3550 },
  { id: 3, name: "JNTU College of Engineering", type: "college", lat: 17.4930, lng: 78.3910 },
  { id: 4, name: "Comfort Stay PG", type: "pg", lat: 17.4270, lng: 78.4430 }
];

export default seedPlaces;
