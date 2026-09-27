import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import seedPlaces from "../data/places";
import { haversineMeters } from "../utils/distance";

const MAP_CONTAINER_STYLE = { width: "100%", height: "320px", borderRadius: "6px" };
const DEFAULT_CENTER = { lat: 17.4326, lng: 78.4071 }; // Hyderabad
const MATCH_RADIUS_METERS = 60;
const STORAGE_KEY = "stugoPlaces_v1";

const ICONS = { hostel: "🏠", pg: "🏘️", college: "🎓" };
const LABELS = { hostel: "Hostel", pg: "PG", college: "College" };

export default function GoogleMapPicker({ onDropSelected }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
  });

  const [places, setPlaces] = useState(seedPlaces);
  const [dropPin, setDropPin] = useState(null);
  const [match, setMatch] = useState(null); // { matched: bool, place? }
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("hostel");

  // Load any user-saved places from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPlaces(JSON.parse(saved));
    } catch (e) {
      // ignore malformed storage
    }
  }, []);

  const persist = (next) => {
    setPlaces(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      /* ignore quota errors */
    }
  };

  const runCheck = useCallback(
    (lat, lng) => {
      let nearest = null;
      let nearestDist = Infinity;
      places.forEach((p) => {
        const d = haversineMeters(lat, lng, p.lat, p.lng);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = p;
        }
      });
      const matched = nearest && nearestDist <= MATCH_RADIUS_METERS;
      const result = matched
        ? { matched: true, place: nearest, distance: nearestDist }
        : { matched: false };
      setMatch(result);
      setShowSaveForm(!matched);
      onDropSelected && onDropSelected(result, { lat, lng });
    },
    [places, onDropSelected]
  );

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setDropPin({ lat, lng });
    runCheck(lat, lng);
  };

  const handleSaveNew = () => {
    if (!newName.trim() || !dropPin) return;
    const next = [
      ...places,
      { id: Date.now(), name: newName.trim(), type: newType, lat: dropPin.lat, lng: dropPin.lng }
    ];
    persist(next);
    const saved = next[next.length - 1];
    setMatch({ matched: true, place: saved, distance: 0 });
    setShowSaveForm(false);
    setNewName("");
    onDropSelected && onDropSelected({ matched: true, place: saved }, dropPin);
  };

  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="map-warning">
        Set <code>REACT_APP_GOOGLE_MAPS_API_KEY</code> in a <code>.env</code> file
        (see <code>.env.example</code>) to load the live map here.
      </div>
    );
  }

  if (!isLoaded) return <div className="map-loading">Loading map…</div>;

  return (
    <div className="map-picker">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={dropPin || DEFAULT_CENTER}
        zoom={13}
        onClick={handleMapClick}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
        {places.map((p) => (
          <Marker
            key={p.id}
            position={{ lat: p.lat, lng: p.lng }}
            label={ICONS[p.type]}
            title={p.name}
          />
        ))}
        {dropPin && <Marker position={dropPin} label="📍" />}
      </GoogleMap>

      {match && (
        <div className={`match-tag ${match.matched ? "matched" : "unmatched"}`}>
          {match.matched
            ? `${ICONS[match.place.type]} Recognized as ${LABELS[match.place.type]} — ${match.place.name}`
            : "📍 No saved match — new location"}
        </div>
      )}

      {showSaveForm && (
        <div className="save-new">
          <input
            type="text"
            placeholder="Name this place"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <select value={newType} onChange={(e) => setNewType(e.target.value)}>
            <option value="hostel">Hostel</option>
            <option value="pg">PG</option>
            <option value="college">College</option>
          </select>
          <button onClick={handleSaveNew}>Save</button>
        </div>
      )}
    </div>
  );
}
