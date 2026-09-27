import React from "react";

const STEPS = [
  { num: "01", title: "Set your drop", body: "Type it or drop a pin. We match you with the nearest rider in seconds." },
  { num: "02", title: "Track them in", body: "Watch the vehicle move on the map, live, down to the last turn." },
  { num: "03", title: "Ride, pay, rate", body: "UPI, cash, or wallet. One tap to rate the ride when you're dropped off." }
];

export default function Steps() {
  return (
    <section className="steps" id="how">
      <div className="steps-inner">
        <h2>Three steps, no app-store queue</h2>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
