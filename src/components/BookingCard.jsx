import React, { useState } from "react";
import GoogleMapPicker from "./GoogleMapPicker";

const FARES = [
  { fare: 49, label: "Bike", mins: "3 min pickup" },
  { fare: 89, label: "Auto", mins: "5 min pickup" },
  { fare: 169, label: "Cab", mins: "7 min pickup" }
];

export default function BookingCard({ selectedFare, onSelectFare }) {
  const [dropReady, setDropReady] = useState(false);
  const [dropLabel, setDropLabel] = useState("");
  const [rideStatus, setRideStatus] = useState("Find my ride");

  const current = FARES.find((f) => f.fare === selectedFare) || FARES[0];

  const handleDropSelected = (result) => {
    setDropReady(true);
    setDropLabel(result.matched ? result.place.name : "Custom drop pin");
  };

  const handleFindRide = () => {
    if (!dropReady) return;
    setRideStatus("Matching you with a rider…");
    setTimeout(() => setRideStatus("Rider found — 3 min away"), 1200);
  };

  return (
    <section className="book-section" id="book">
      <div className="book-card">
        <h2>Where to?</h2>

        <div className="field-row">
          <div className="field">
            <span className="dot pick" />
            <input type="text" defaultValue="Jubilee Hills, Hyderabad" readOnly />
          </div>
          <div className="field">
            <span className="dot drop" />
            <input type="text" value={dropLabel} placeholder="Drop location" readOnly />
          </div>
        </div>

        <GoogleMapPicker onDropSelected={handleDropSelected} />

        <div className="ride-select">
          {FARES.map((f) => (
            <div
              key={f.fare}
              className={"ride-chip" + (f.fare === selectedFare ? " active" : "")}
              onClick={() => onSelectFare(f.fare)}
            >
              {f.label} · ₹{f.fare}
            </div>
          ))}
        </div>

        <div className="fare-line">
          <span className="fare-label">Estimated fare</span>
          <span className="amount">
            ₹{current.fare} <span>· {current.mins}</span>
          </span>
        </div>

        <button className="btn btn-primary" disabled={!dropReady} onClick={handleFindRide}>
          {rideStatus}
        </button>
      </div>
    </section>
  );
}
