import React, { useState, useEffect } from "react";
import "./CustomerView.css";
import { validLocations, getDistance } from "../data/locations";

export default function CustomerView({ activeRide, onRideRequest, onRideReset }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicle, setVehicle] = useState("Auto Rickshaw");
  const [isBooking, setIsBooking] = useState(false);
  const [estimatedFare, setEstimatedFare] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState(null);

  useEffect(() => {
    if (pickup.length > 2 && dropoff.length > 2) {
      const pickupLower = pickup.toLowerCase();
      const dropoffLower = dropoff.toLowerCase();
      
      const pickupMatch = validLocations.find(loc => pickupLower.includes(loc.name.toLowerCase()));
      const dropoffMatch = validLocations.find(loc => dropoffLower.includes(loc.name.toLowerCase()));
      
      let distance = 5; // Default distance if one of them is missing/custom
      if (pickupMatch && dropoffMatch) {
        distance = getDistance(pickupMatch.lat, pickupMatch.lon, dropoffMatch.lat, dropoffMatch.lon);
      }
      
      // Calculate fare: 30 + (distance * 12)
      const calculatedFare = Math.round(30 + (distance * 12));
      setEstimatedDistance(distance.toFixed(1));
      setEstimatedFare(calculatedFare);
    } else {
      setEstimatedFare(null);
      setEstimatedDistance(null);
    }
  }, [pickup, dropoff]);

  const handleBookRide = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff) {
      alert("Please enter both pickup and drop-off locations.");
      return;
    }

    const pickupLower = pickup.toLowerCase();
    const dropoffLower = dropoff.toLowerCase();
    
    const isValid = validLocations.some(loc => {
      const locLower = loc.name.toLowerCase();
      return pickupLower.includes(locLower) || dropoffLower.includes(locLower);
    });

    if (!isValid) {
      alert("Sorry, Stugo rides are currently only available to or from our supported locations (e.g. PES university, Amrita Hostel).");
      return;
    }

    if (!window.confirm(`Estimated Fare: ₹${estimatedFare} (${estimatedDistance} km).\nDo you want to confirm this booking?`)) {
      return;
    }

    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      // Notify the parent (App) that a ride was requested
      if (onRideRequest) {
        onRideRequest({ pickup, dropoff, vehicle, fare: estimatedFare, distance: estimatedDistance, status: 'pending' });
      }

      setPickup("");
      setDropoff("");
    }, 1500);
  };

  return (
    <div className="customer-view-container">
      {/* Navbar */}
      <nav className="customer-navbar">
        <div className="nav-logo">
          <img src="/logo.png" alt="Stugo Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </div>
        
        <div className="nav-links">
          <a href="#why">Why Choose Us</a>
          <a href="#routes">Popular Routes</a>
          <a href="#how">How it Works</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </div>
        
        <div className="nav-actions">
          <button className="btn-track" onClick={() => alert("Track your active ride feature coming soon.")}><span>📍</span> Track Ride</button>
          <button className="btn-quote-nav" onClick={() => document.getElementById("booking-form").scrollIntoView({behavior: "smooth"})}>Book Now</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="customer-hero">
        <div className="hero-left">
          <div className="trust-badge">
            <span className="dot-green"></span> Trusted by 12,000+ Students across Bengaluru
          </div>
          
          <h1 className="hero-title">
            Fast, Safe<br/>
            <span className="highlight-text">Auto</span> for College Life.
          </h1>
          
          <p className="hero-subtitle">
            Skip the long walks and expensive cabs. Book a quick, safe, and affordable auto to your campus, hostel, or nearby hangouts.
          </p>
          
          <div className="perks-row">
            <div className="perk-tag">🎓 15% Student Discount</div>
            <div className="perk-tag">⏱️ Under 5 min ETAs</div>
            <div className="perk-tag">🛡️ Verified Drivers</div>
          </div>
          
          <div className="frequent-schools">
            <p>POPULAR CAMPUS LOCATIONS</p>
            <div className="school-list">
              <span>🏛️ PES University</span>
              <span>🏛️ RVCE</span>
              <span>🏛️ Christ Uni</span>
              <span>🏛️ BMSCE</span>
              <span>🏛️ Jain Uni</span>
            </div>
          </div>
        </div>

        <div className="hero-right" id="booking-form">
          <div className="quote-estimator-card">
            <div className="estimator-header">
              <div>
                <h3 className="estimator-title">
                  <span className="icon-purple">🛺</span> Book Your Ride
                </h3>
                <p className="estimator-sub">No surge pricing during college rush hours</p>
              </div>
              <div className="save-badge">Student Rates</div>
            </div>

            <form className="quote-form" onSubmit={handleBookRide}>
              <div className="form-group">
                <label>Pick-up Location</label>
                <div className="input-with-icon">
                  <span className="icon">📍</span>
                  <input 
                    type="text" 
                    placeholder="e.g. PES University Main Gate" 
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Drop-off Location</label>
                <div className="input-with-icon">
                  <span className="icon">🏫</span>
                  <input 
                    type="text" 
                    placeholder="e.g. Koramangala 5th Block" 
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                    <option>Auto Rickshaw</option>
                    <option>Bike Taxi</option>
                    <option>Mini Cab</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Ride Type</label>
                  <select>
                    <option>Quick Ride (Solo)</option>
                    <option>Shared Auto (Cheaper)</option>
                  </select>
                </div>
              </div>

              <div className="discount-checkbox">
                <label>
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-text">🎓 Apply Active Student (.edu) Discount</span>
                </label>
              </div>

              {estimatedFare && (
                <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Estimated Fare</span>
                    <span style={{ fontSize: '24px', color: '#0F172A', fontWeight: 800 }}>₹{estimatedFare}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '13px', color: '#64748B', display: 'block' }}>Distance: {estimatedDistance} km</span>
                    <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 600 }}>includes 15% discount</span>
                  </div>
                </div>
              )}

              <button className="btn-calculate" type="submit" disabled={isBooking}>
                <span className="icon">{isBooking ? "⏳" : "⚡"}</span> 
                {isBooking ? "Finding Drivers..." : "Book Ride Now"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="why">
        <div className="section-header-center">
          <p className="section-eyebrow">BUILT FOR COLLEGE LIFE</p>
          <h2>Why Students & Parents Trust Stugo</h2>
          <p className="section-subtext">We eliminate the stress of campus commutes with features tailored specifically for university students.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon bg-purple">🏷️</div>
            <h3>Student-Friendly Fares</h3>
            <p>Verify your student ID to unlock standard pricing. No crazy surge multipliers when classes get over at the same time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon bg-green">📍</div>
            <h3>Campus Gate Pickups</h3>
            <p>Our drivers know the campuses. We map specific pick-up points like "Hostel Block C" or "Arch Gate" for exact locations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon bg-blue">🤝</div>
            <h3>Shared Campus Rides</h3>
            <p>Going to the same metro station? Opt into a shared auto with other students from your campus to split the fare.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon bg-teal">🛡️</div>
            <h3>Safe & Verified Drivers</h3>
            <p>100% background-checked drivers, SOS button in-app, and real-time ride tracking links you can share with parents or friends.</p>
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section className="routes-section" id="routes">
        <div className="routes-header-flex">
          <div>
            <p className="section-eyebrow">POPULAR CONNECTIONS</p>
            <h2>Frequent Student Routes</h2>
            <p className="section-subtext">Estimated auto fares for the most popular campus to transit hubs.</p>
          </div>
          <button className="btn-outline-blue" onClick={() => document.getElementById("booking-form").scrollIntoView({behavior: "smooth"})}>ⓘ Book a custom route</button>
        </div>

        <div className="routes-grid">
          <div className="route-card" onClick={() => { setPickup("PES University"); setDropoff("Banashankari Metro"); document.getElementById("booking-form").scrollIntoView({behavior: "smooth"}); }}>
            <div className="route-top">
              <div>
                <p className="route-region">TRANSIT CONNECT</p>
                <h4>PES University ➔ BSK Metro</h4>
              </div>
              <div className="route-price">₹ 45</div>
            </div>
            <div className="route-stats">
              <div>
                <p className="stat-label">Distance</p>
                <p className="stat-value">3.2 km</p>
              </div>
              <div>
                <p className="stat-label">Time</p>
                <p className="stat-value">10 mins</p>
              </div>
              <div>
                <p className="stat-label">Popularity</p>
                <p className="stat-value text-green">🟢 Very High</p>
              </div>
            </div>
          </div>

          <div className="route-card" onClick={() => { setPickup("RVCE"); setDropoff("Kengeri TTMC"); document.getElementById("booking-form").scrollIntoView({behavior: "smooth"}); }}>
            <div className="route-top">
              <div>
                <p className="route-region">TRANSIT CONNECT</p>
                <h4>RVCE ➔ Kengeri TTMC</h4>
              </div>
              <div className="route-price">₹ 35</div>
            </div>
            <div className="route-stats">
              <div>
                <p className="stat-label">Distance</p>
                <p className="stat-value">2.5 km</p>
              </div>
              <div>
                <p className="stat-label">Time</p>
                <p className="stat-value">8 mins</p>
              </div>
              <div>
                <p className="stat-label">Popularity</p>
                <p className="stat-value text-green">🟢 Very High</p>
              </div>
            </div>
          </div>

          <div className="route-card" onClick={() => { setPickup("Christ University"); setDropoff("Koramangala"); document.getElementById("booking-form").scrollIntoView({behavior: "smooth"}); }}>
            <div className="route-top">
              <div>
                <p className="route-region">HANGOUT CONNECT</p>
                <h4>Christ Uni ➔ Koramangala</h4>
              </div>
              <div className="route-price">₹ 55</div>
            </div>
            <div className="route-stats">
              <div>
                <p className="stat-label">Distance</p>
                <p className="stat-value">4.0 km</p>
              </div>
              <div>
                <p className="stat-label">Time</p>
                <p className="stat-value">15 mins</p>
              </div>
              <div>
                <p className="stat-label">Popularity</p>
                <p className="stat-value text-blue">High</p>
              </div>
            </div>
          </div>

          <div className="route-card" onClick={() => { setPickup("BMSCE"); setDropoff("Bull Temple Road"); document.getElementById("booking-form").scrollIntoView({behavior: "smooth"}); }}>
            <div className="route-top">
              <div>
                <p className="route-region">LOCAL CONNECT</p>
                <h4>BMSCE ➔ Bull Temple Rd</h4>
              </div>
              <div className="route-price">₹ 25</div>
            </div>
            <div className="route-stats">
              <div>
                <p className="stat-label">Distance</p>
                <p className="stat-value">1.5 km</p>
              </div>
              <div>
                <p className="stat-label">Time</p>
                <p className="stat-value">5 mins</p>
              </div>
              <div>
                <p className="stat-label">Popularity</p>
                <p className="stat-value text-blue">High</p>
              </div>
            </div>
          </div>

          <div className="route-card" onClick={() => { setPickup("Jain University"); setDropoff("Jayanagar 4th Block"); document.getElementById("booking-form").scrollIntoView({behavior: "smooth"}); }}>
            <div className="route-top">
              <div>
                <p className="route-region">HANGOUT CONNECT</p>
                <h4>Jain Uni ➔ Jayanagar 4th Blk</h4>
              </div>
              <div className="route-price">₹ 40</div>
            </div>
            <div className="route-stats">
              <div>
                <p className="stat-label">Distance</p>
                <p className="stat-value">3.0 km</p>
              </div>
              <div>
                <p className="stat-label">Time</p>
                <p className="stat-value">12 mins</p>
              </div>
              <div>
                <p className="stat-label">Popularity</p>
                <p className="stat-value text-gray">Moderate</p>
              </div>
            </div>
          </div>

          <div className="route-card" onClick={() => { setPickup("Mount Carmel College"); setDropoff("MG Road Metro"); document.getElementById("booking-form").scrollIntoView({behavior: "smooth"}); }}>
            <div className="route-top">
              <div>
                <p className="route-region">TRANSIT CONNECT</p>
                <h4>Mount Carmel ➔ MG Road</h4>
              </div>
              <div className="route-price">₹ 60</div>
            </div>
            <div className="route-stats">
              <div>
                <p className="stat-label">Distance</p>
                <p className="stat-value">4.5 km</p>
              </div>
              <div>
                <p className="stat-label">Time</p>
                <p className="stat-value">18 mins</p>
              </div>
              <div>
                <p className="stat-label">Popularity</p>
                <p className="stat-value text-gray">Moderate</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section" id="how">
        <div className="section-header-center">
          <p className="section-eyebrow">SIMPLE & TRANSPARENT</p>
          <h2>4 Easy Steps to Ride</h2>
          <p className="section-subtext">From campus gate to your destination in four hassle-free steps.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number bg-purple">1</div>
            <h3>Set Destination</h3>
            <p>Open the app, enter your pickup gate and destination. Apply your student discount and check the upfront fare.</p>
          </div>
          <div className="step-card">
            <div className="step-number bg-blue">2</div>
            <h3>Get Matched Fast</h3>
            <p>Our algorithm instantly connects you with the nearest verified auto driver around your campus.</p>
          </div>
          <div className="step-card">
            <div className="step-number bg-indigo">3</div>
            <h3>Enjoy the Ride</h3>
            <p>Share your trip status with friends. Enjoy a safe, tracked journey without negotiating fares.</p>
          </div>
          <div className="step-card">
            <div className="step-number bg-green">4</div>
            <h3>Pay & Rate</h3>
            <p>Pay seamlessly via UPI or cash directly to the driver. Rate your trip to help us maintain a 5-star fleet.</p>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section className="reviews-section" id="reviews">
        <div className="section-header-center">
          <p className="section-eyebrow">REAL EXPERIENCES</p>
          <h2>What Students Are Saying</h2>
          <p className="section-subtext">Don't just take our word for it. Here's how Stugo is changing campus commutes.</p>
        </div>

        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"Life saver! I used to wait 20 mins for an auto outside PESU gate. Now I just book a shared auto during class and it's waiting when I walk out."</p>
            <div className="reviewer-info">
              <div className="reviewer-avatar">S</div>
              <div>
                <h4>Sneha R.</h4>
                <p>PES University</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"The student discount is actually legit. No surge pricing when it starts raining at 5 PM. Finally an app that understands college budgets."</p>
            <div className="reviewer-info">
              <div className="reviewer-avatar bg-blue">A</div>
              <div>
                <h4>Aditya K.</h4>
                <p>RV College of Engineering</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">⭐⭐⭐⭐⭐</div>
            <p className="review-text">"My parents forced me to use this because of the verified drivers and live tracking, but honestly the UI is super smooth and drivers are very polite."</p>
            <div className="reviewer-info">
              <div className="reviewer-avatar bg-purple">M</div>
              <div>
                <h4>Meghana V.</h4>
                <p>Mount Carmel College</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="faq-container">
          <div className="faq-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about Stugo rides.</p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How do I get the 15% student discount?</h4>
              <p>Simply register with your university's .edu email address, or upload a photo of your valid student ID in the profile section. Once verified, the discount is automatically applied to all your rides.</p>
            </div>
            <div className="faq-item">
              <h4>How does the "Shared Campus Ride" feature work?</h4>
              <p>If you're heading to a common transit hub (like a Metro station), select "Shared Auto". We'll match you with 1-2 other students from your campus going the same way, cutting your fare by up to 50%.</p>
            </div>
            <div className="faq-item">
              <h4>Why is Stugo cheaper during rush hour?</h4>
              <p>Unlike other apps, we cap our surge multipliers around college campuses during class dispersal times (typically 12 PM, 4 PM, and 5 PM) to ensure students aren't penalized for their schedules.</p>
            </div>
            <div className="faq-item">
              <h4>Can I schedule a ride in advance for my exam?</h4>
              <p>Yes! You can pre-book a ride up to 48 hours in advance to guarantee an auto is waiting outside your hostel or apartment right when you need it for your morning exams.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="footer-reviews">
        <div className="stars">⭐⭐⭐⭐⭐ 4.9 / 5.0 (2,400+ reviews)</div>
        <h2>Loved by Students, Approved by Parents</h2>
      </div>

      {activeRide && activeRide.status === 'accepted' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '90%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ color: '#0F172A', fontSize: '24px', marginBottom: '16px' }}>🎉 Ride Accepted!</h2>
            
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748B' }}>Your OTP</p>
              <h3 style={{ margin: 0, fontSize: '36px', letterSpacing: '4px', color: '#3B82F6' }}>8421</h3>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', color: '#334155' }}>Driver Details</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👨🏽‍✈️</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>Raju Kumar</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>⭐ 4.8 (1.2k rides)</p>
                </div>
              </div>
              
              <h4 style={{ margin: '16px 0 12px 0', color: '#334155' }}>Vehicle Details</h4>
              <div style={{ background: '#E2E8F0', padding: '12px', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{activeRide.vehicle} - Yellow & Green</p>
                <p style={{ margin: '4px 0 0 0', fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold' }}>KA 01 AB 1234</p>
              </div>
            </div>

            <button onClick={onRideReset} style={{ width: '100%', padding: '14px', background: '#0F172A', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
