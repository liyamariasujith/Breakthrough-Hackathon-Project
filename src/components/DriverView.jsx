import React, { useState } from "react";
import "./DriverView.css";

const DUMMY_RIDES = [
  { id: 1, date: "Today, 10:30 AM", pickup: "PES University (EC)", dropoff: "BTM Layout, Bengaluru", fare: "₹ 180", status: "completed", type: "Auto", passengers: 2 },
  { id: 2, date: "Today, 08:15 AM", pickup: "Koramangala Block 5", dropoff: "HSR Layout Sector 2", fare: "₹ 240", status: "completed", type: "Cab", passengers: 1 },
  { id: 3, date: "Yesterday, 06:45 PM", pickup: "Indiranagar Metro", dropoff: "Domlur", fare: "₹ 90", status: "completed", type: "Bike", passengers: 1 },
  { id: 4, date: "Yesterday, 02:10 PM", pickup: "MG Road", dropoff: "Cubbon Park", fare: "₹ 0", status: "cancelled", type: "Auto", passengers: 3 },
  { id: 5, date: "24 Sep, 11:00 AM", pickup: "Jayanagar 4th Block", dropoff: "JP Nagar Phase 1", fare: "₹ 150", status: "completed", type: "Auto", passengers: 2 }
];

const RECENT_EARNINGS = [
  { id: "#STG7284", date: "12 Sep, 4:15 PM", fromTo: "PES University → HSR Layout", fare: "₹ 180", earnings: "₹ 163", status: "Completed" },
  { id: "#STG7283", date: "12 Sep, 3:32 PM", fromTo: "Electronic City → Koramangala", fare: "₹ 220", earnings: "₹ 200", status: "Completed" },
  { id: "#STG7282", date: "12 Sep, 2:10 PM", fromTo: "BTM Layout → PES University", fare: "₹ 150", earnings: "₹ 136", status: "Completed" },
  { id: "#STG7281", date: "12 Sep, 12:48 PM", fromTo: "Whitefield → Indiranagar", fare: "₹ 240", earnings: "₹ 218", status: "Completed" }
];

export default function DriverView({ pendingRide, onRideRespond }) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [rideFilter, setRideFilter] = useState("all");
  
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleAcceptRide = () => {
    if (selectedDemoRide) {
      alert("Upcoming demo ride accepted!");
      setSelectedDemoRide(null);
    } else {
      if (onRideRespond) onRideRespond('accept');
    }
  };

  const handleDeclineRide = () => {
    if (selectedDemoRide) {
      setSelectedDemoRide(null);
    } else {
      if (onRideRespond) onRideRespond('decline');
    }
  };

  const [selectedDemoRide, setSelectedDemoRide] = useState(null);

  const handleActionClick = (actionName) => {
    if (actionName === "Accept/View Ride") {
      setSelectedDemoRide({
        pickup: "PES University (EC)",
        dropoff: "BTM Layout, Bengaluru",
        distance: 5.2,
        fare: 185,
        vehicle: "Auto Rickshaw (Yellow)"
      });
    } else {
      alert(`Action clicked: ${actionName}`);
    }
  };

  const renderHomeContent = () => (
    <div className="dashboard-grid">
      <div className="center-col">
        <div className={`status-banner ${!isOnline ? 'offline' : ''}`}>
          <div>
            <h3 className="status-title">
              <span className={`driver-dot ${!isOnline ? 'offline-color' : ''}`}></span> 
              {isOnline ? "You are Online" : "You are Offline"}
            </h3>
            <p>{isOnline ? "Ready to receive ride requests" : "Go online to start receiving ride requests"}</p>
          </div>
          <div className={`toggle-switch ${isOnline ? 'active' : ''}`} onClick={toggleOnlineStatus}>
            <div className="toggle-knob"></div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card" onClick={() => handleActionClick("Today's Rides")}>
            <div className="stat-label">🚗 Today's Rides</div>
            <div className="stat-value">6 <span className="arrow">›</span></div>
          </div>
          <div className="stat-card" onClick={() => handleActionClick("Today's Earnings")}>
            <div className="stat-label">₹ Today's Earnings</div>
            <div className="stat-value">₹ 1,260 <span className="arrow">›</span></div>
          </div>
          <div className="stat-card" onClick={() => handleActionClick("Health Insurance")}>
            <div className="stat-label">🛡️ Health Insurance</div>
            <div className="stat-value">₹ 3,000 <span className="arrow">›</span></div>
            <div className="stat-sub">Available Balance</div>
          </div>
          <div className="stat-card" onClick={() => handleActionClick("Online Time")}>
            <div className="stat-label">🕒 Online Time</div>
            <div className="stat-value">4h 32m <span className="arrow">›</span></div>
          </div>
          <div className="stat-card" onClick={() => handleActionClick("Rating")}>
            <div className="stat-label">⭐ Rating</div>
            <div className="stat-value">4.8 <span className="arrow">›</span></div>
          </div>
        </div>

        <div className="map-ride-row">
          <div className="map-card">
            <div className="map-header">
              <span>📍 Electronic City, Bengaluru ›</span>
            </div>
            <div className="map-placeholder">
              <iframe 
                title="Driver Location Map"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.64%2C12.83%2C77.68%2C12.86&amp;layer=mapnik" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', filter: 'contrast(1.1) brightness(0.95)' }}
              ></iframe>
              {isOnline && <div className="pulse-dot" style={{ position: 'absolute', zIndex: 10, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>}
              <button className="go-online-btn" onClick={toggleOnlineStatus} style={{ zIndex: 10 }}>
                {isOnline ? "⏸ Go Offline" : "📍 Go Online"}
              </button>
            </div>
          </div>
          
          <div className="upcoming-col">
            <div className="upcoming-card">
              <div className="upcoming-header">
                <h3>Upcoming Ride</h3>
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("rides"); }}>View All</a>
              </div>
              
              {isOnline ? (
                <>
                  <div className="ride-locations">
                    <div className="loc"><span className="driver-dot green"></span> PES University (EC)</div>
                    <div className="loc"><span className="driver-dot red"></span> BTM Layout, Bengaluru</div>
                  </div>
                  <div className="ride-details">
                    <div>👤 2 Passengers</div>
                    <div>🛺 Auto</div>
                    <div>₹ 180</div>
                    <div>🕒 12 min away</div>
                  </div>
                  <button className="btn-dark" onClick={() => handleActionClick("Accept/View Ride")}>View Details ›</button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#94A3B8' }}>
                  <p>You are currently offline.</p>
                  <p style={{ fontSize: '12px', marginTop: '5px' }}>Go online to see upcoming rides.</p>
                </div>
              )}
            </div>
            
            <div className="profile-update-card" onClick={() => handleActionClick("Update Profile")} style={{ cursor: 'pointer' }}>
              <span className="icon">📢</span>
              <div>
                <h4>Keep your profile updated</h4>
                <p>Helps you get more rides and better earnings.</p>
              </div>
              <span className="arrow">›</span>
            </div>
          </div>
        </div>

        <div className="health-banner">
          <div className="health-left">
            <div className="health-icon">🛡️</div>
            <div>
              <h4>Health Insurance <span className="badge">Active</span></h4>
              <p>Your safety matters. Get health coverage while you drive.</p>
            </div>
          </div>
          <div className="health-stats">
            <div>
              <div className="label">Coverage Amount</div>
              <div className="val">₹ 3,000</div>
              <div className="sub">Available Balance</div>
            </div>
            <div>
              <div className="label">Premium Covered by Stugo</div>
              <div className="val">₹ 1,200 / year ⓘ</div>
            </div>
          </div>
          <button className="btn-purple" onClick={() => handleActionClick("View Insurance Details")}>View Details ›</button>
        </div>
      </div>

      <div className="right-col">
        <div className="promo-card">
          <h3>Safe rides.<br/>Happy passengers.<br/>Better tomorrow.</h3>
          <div className="promo-logo">stugo</div>
          <div className="promo-auto">🛺</div>
        </div>

        <div className="earnings-summary-card">
          <div className="card-header">
            <h3>Earnings Summary</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("earnings"); }}>View Details</a>
          </div>
          <p className="total-label">Total Earnings (This Week)</p>
          <h2>₹ 7,850</h2>
          <div className="bar-chart">
            <div className="bar-col"><div className="bar h-40"></div><span>Mon</span></div>
            <div className="bar-col"><div className="bar h-60"></div><span>Tue</span></div>
            <div className="bar-col"><div className="bar h-50"></div><span>Wed</span></div>
            <div className="bar-col"><div className="bar h-80"></div><span>Thu</span></div>
            <div className="bar-col"><div className="bar h-100"></div><span>Fri</span></div>
            <div className="bar-col"><div className="bar h-70"></div><span>Sat</span></div>
            <div className="bar-col"><div className="bar h-90"></div><span>Sun</span></div>
          </div>
        </div>

        <div className="quick-actions-card">
          <h3>Quick Actions</h3>
          <ul className="actions-list">
            <li onClick={toggleOnlineStatus}>
              <span className="icon toggle-on">{isOnline ? '🟢' : '⚫'}</span> {isOnline ? 'Go Offline' : 'Go Online'}
            </li>
            <li onClick={() => { setActiveTab("rides"); }}><span className="icon">🕒</span> View Ride History</li>
            <li onClick={() => { setActiveTab("vehicle"); }}><span className="icon">🚗</span> Update Vehicle Details</li>
            <li onClick={() => { setActiveTab("support"); }}><span className="icon">🎧</span> Contact Support</li>
          </ul>
        </div>

        <div className="help-card" onClick={() => { setActiveTab("support"); }}>
          <div className="help-icon">🎧</div>
          <div>
            <h4>Need Help?</h4>
            <p>Our support team is available 24/7 for you.</p>
          </div>
          <span className="arrow">›</span>
        </div>
      </div>
    </div>
  );

  const renderMyRidesContent = () => {
    const filteredRides = DUMMY_RIDES.filter(r => rideFilter === 'all' || r.status === rideFilter);

    return (
      <div className="my-rides-view">
        <div className="rides-header">
          <h2>My Rides</h2>
          <div className="rides-tabs">
            <button className={rideFilter === 'all' ? 'active' : ''} onClick={() => setRideFilter('all')}>All</button>
            <button className={rideFilter === 'completed' ? 'active' : ''} onClick={() => setRideFilter('completed')}>Completed</button>
            <button className={rideFilter === 'cancelled' ? 'active' : ''} onClick={() => setRideFilter('cancelled')}>Cancelled</button>
          </div>
        </div>

        <div className="rides-list">
          {filteredRides.length > 0 ? filteredRides.map(ride => (
            <div key={ride.id} className="ride-history-card">
              <div className="ride-history-top">
                <span className="ride-date">{ride.date}</span>
                <span className={`ride-status ${ride.status}`}>{ride.status.toUpperCase()}</span>
              </div>
              <div className="ride-locations">
                <div className="loc"><span className="driver-dot green"></span> {ride.pickup}</div>
                <div className="loc"><span className="driver-dot red"></span> {ride.dropoff}</div>
              </div>
              <div className="ride-history-bottom">
                <div className="ride-info-tags">
                  <span>🚗 {ride.type}</span>
                  <span>👤 {ride.passengers}</span>
                </div>
                <div className="ride-fare">{ride.fare}</div>
              </div>
            </div>
          )) : (
            <div className="no-rides">No rides found for this filter.</div>
          )}
        </div>
      </div>
    );
  };

  const renderEarningsContent = () => {
    return (
      <div className="earnings-view dashboard-grid">
        <div className="center-col">
          {/* Top Banner Row */}
          <div className="earnings-top-row">
            <div className="total-earnings-card">
              <div className="card-top">
                <div className="icon-wrapper purple">💳</div>
                <a href="#" className="view-details-link" onClick={(e) => { e.preventDefault(); handleActionClick("View Total Earnings"); }}>View Details →</a>
              </div>
              <p className="label">Total Earnings (This Week)</p>
              <h2>₹ 7,850</h2>
              <p className="trend positive">↑ + 12% from last week</p>
            </div>
            
            <div className="available-balance-card">
              <div className="icon-wrapper green">💸</div>
              <p className="label">Available Balance</p>
              <h2>₹ 520</h2>
              <button className="btn-withdraw" onClick={() => handleActionClick("Withdraw Funds")}>Withdraw →</button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row earnings-stats">
            <div className="stat-card">
              <div className="icon">🚗</div>
              <div className="stat-label">Total Rides</div>
              <div className="stat-value">48</div>
              <div className="trend positive">↑ + 8% from last week</div>
            </div>
            <div className="stat-card">
              <div className="icon">🕒</div>
              <div className="stat-label">Online Time</div>
              <div className="stat-value">22h 45m</div>
              <div className="trend positive">↑ + 14% from last week</div>
            </div>
            <div className="stat-card">
              <div className="icon">₹</div>
              <div className="stat-label">Avg. Ride Earnings</div>
              <div className="stat-value">₹ 163</div>
              <div className="trend positive">↑ + 9% from last week</div>
            </div>
            <div className="stat-card">
              <div className="icon">⭐</div>
              <div className="stat-label">Rating</div>
              <div className="stat-value">4.8</div>
              <div className="stat-sub">(1205 ratings)</div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="earnings-chart-section">
            <div className="chart-header">
              <h3>Earnings Overview</h3>
              <div className="chart-tabs">
                <button className="active">This Week</button>
                <button>This Month</button>
                <button>Last 3 Months</button>
              </div>
            </div>
            
            <div className="chart-body">
              <div className="y-axis">
                <span>₹ 2,000</span>
                <span>₹ 1,500</span>
                <span>₹ 1,000</span>
                <span>₹ 500</span>
                <span>₹ 0</span>
              </div>
              <div className="chart-bars">
                <div className="chart-col"><div className="chart-bar h-1200"></div><div className="x-label">Mon<br/>₹ 1,200</div></div>
                <div className="chart-col"><div className="chart-bar h-1450"></div><div className="x-label">Tue<br/>₹ 1,450</div></div>
                <div className="chart-col"><div className="chart-bar h-1380"></div><div className="x-label">Wed<br/>₹ 1,380</div></div>
                <div className="chart-col"><div className="chart-bar h-1620"></div><div className="x-label">Thu<br/>₹ 1,620</div></div>
                <div className="chart-col"><div className="chart-bar h-1540"></div><div className="x-label">Fri<br/>₹ 1,540</div></div>
                <div className="chart-col"><div className="chart-bar h-1480"></div><div className="x-label">Sat<br/>₹ 1,480</div></div>
                <div className="chart-col"><div className="chart-bar h-1360"></div><div className="x-label">Sun<br/>₹ 1,360</div></div>
              </div>
            </div>
          </div>

          {/* Recent Earnings Table */}
          <div className="recent-earnings-section">
            <div className="recent-header">
              <h3>Recent Earnings</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); handleActionClick("View All Recent"); }}>View All</a>
            </div>
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Ride ID</th>
                  <th>From → To</th>
                  <th>Fare</th>
                  <th>Your Earnings</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_EARNINGS.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td className="light-text">{item.id}</td>
                    <td>{item.fromTo}</td>
                    <td>{item.fare}</td>
                    <td className="bold">{item.earnings}</td>
                    <td><span className="status-badge success">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar for Earnings */}
        <div className="right-col">
          <div className="promo-card dark">
            <h3>Drive more,<br/>earn more!</h3>
            <p className="promo-sub">Higher rides. Bigger rewards.</p>
            <div className="wallet-graphic">💳</div>
          </div>

          <div className="breakdown-card">
            <div className="card-header">
              <h3>Earnings Breakdown</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); handleActionClick("View Breakdown"); }}>View All</a>
            </div>
            <ul className="breakdown-list">
              <li>
                <div className="bd-left"><span className="icon">🚗</span> Ride Earnings</div>
                <div className="bd-right">₹ 7,450 <span className="pct">94%</span></div>
              </li>
              <li>
                <div className="bd-left"><span className="icon yellow">⚡</span> Surge Bonus</div>
                <div className="bd-right">₹ 200 <span className="pct">3%</span></div>
              </li>
              <li>
                <div className="bd-left"><span className="icon">🎁</span> Incentives</div>
                <div className="bd-right">₹ 100 <span className="pct">1%</span></div>
              </li>
              <li>
                <div className="bd-left"><span className="icon">💰</span> Other</div>
                <div className="bd-right">₹ 100 <span className="pct">1%</span></div>
              </li>
            </ul>
          </div>

          <div className="protect-card">
            <div className="icon">🛡️</div>
            <div>
              <h4>Stugo Protect</h4>
              <p>Get up to ₹ 3,000 health insurance cover while you drive.</p>
            </div>
            <span className="arrow">›</span>
          </div>

          <div className="help-card" onClick={() => setActiveTab("support")}>
            <div className="help-icon">🎧</div>
            <div>
              <h4>Need Help?</h4>
              <p>Our support team is available 24/7 for you.</p>
            </div>
            <span className="arrow">›</span>
          </div>
        </div>
      </div>
    );
  };

  const renderProfileContent = () => {
    return (
      <div className="profile-view dashboard-grid">
        <div className="center-col">
          
          <div className="profile-hero-card">
            <div className="profile-hero-content">
              <div className="profile-hero-avatar">
                <span className="online-pill">Online</span>
              </div>
              <div className="profile-hero-details">
                <div className="hero-name-row">
                  <h2>Raju Kumar <span className="verified-badge">✔</span></h2>
                  <div className="top-performer-badge">👑 Top Performer</div>
                </div>
                <p className="hero-driver-id">Driver ID: STG7284</p>
                <p className="hero-rating">⭐ <strong>4.8</strong> (1205 ratings)</p>
                <p className="hero-bio">Hi! I'm Raju. Safe rides, always!</p>
                <div className="hero-meta">
                  <span>📍 Bengaluru</span>
                  <span>📅 Joined on 12 Aug 2024</span>
                  <span>✅ Verified Driver</span>
                </div>
              </div>
            </div>
            <button className="btn-edit-pencil" onClick={() => handleActionClick("Edit Profile")}>✏️</button>
          </div>

          <div className="profile-section-card">
            <div className="section-header">
              <h3>Personal Information</h3>
              <button className="btn-edit-text" onClick={() => handleActionClick("Edit Personal Info")}>✏️ Edit</button>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">👤</div>
                <div>
                  <div className="info-label">Full Name</div>
                  <div className="info-val">Raju Kumar</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <div className="info-label">Email Address</div>
                  <div className="info-val">raju.kumar@gmail.com</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <div className="info-label">Phone Number</div>
                  <div className="info-val">+91 98765 43210</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <div className="info-label">Address</div>
                  <div className="info-val">#123, 2nd Cross, Koramangala<br/>Bengaluru, Karnataka - 560034</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📅</div>
                <div>
                  <div className="info-label">Date of Birth</div>
                  <div className="info-val">15 Jan 1995</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">🌐</div>
                <div>
                  <div className="info-label">Preferred Language</div>
                  <div className="info-val">English, Kannada, Hindi</div>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⚧</div>
                <div>
                  <div className="info-label">Gender</div>
                  <div className="info-val">Male</div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section-card docs-card">
            <div className="section-header">
              <h3>📄 Documents Status</h3>
              <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); handleActionClick("View All Documents"); }}>View All</a>
            </div>
            <div className="docs-row">
              <div className="doc-item">
                <div className="doc-icon">🪪</div>
                <div className="doc-text">
                  <h4>Driving License</h4>
                  <p>DL No. KA-0123456789</p>
                </div>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
              <div className="doc-item">
                <div className="doc-icon">💳</div>
                <div className="doc-text">
                  <h4>Aadhaar Card</h4>
                  <p>XXXX-XXXX-5678</p>
                </div>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
              <div className="doc-item">
                <div className="doc-icon">💳</div>
                <div className="doc-text">
                  <h4>PAN Card</h4>
                  <p>ABCDE1234F</p>
                </div>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
              <div className="doc-item">
                <div className="doc-icon">👤</div>
                <div className="doc-text">
                  <h4>Profile Photo</h4>
                  <p>Uploaded</p>
                </div>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
            </div>
          </div>

          <div className="profile-help-card">
            <div className="icon">🎧</div>
            <div>
              <h4>Need Help?</h4>
              <p>Our support team is available 24/7 to assist you.</p>
            </div>
            <button className="btn-contact-support" onClick={() => setActiveTab("support")}>Contact Support →</button>
          </div>

        </div>
        
        <div className="right-col">
          <div className="safety-promo-card">
            <div className="safety-icon">🛡️</div>
            <h3>Stay Safe, Ride Safe</h3>
            <p>Your safety matters. We're always here to support you.</p>
            <div className="safety-illustration">
              <div className="safety-badge">✔</div>
              <div className="safety-car">🛺</div>
            </div>
            <button className="btn-safety-tips" onClick={() => handleActionClick("View Safety Tips")}>View Safety Tips →</button>
          </div>

          <div className="quick-actions-card profile-actions">
            <h3>⚡ Quick Actions</h3>
            <ul className="actions-list">
              <li onClick={() => handleActionClick("Update Personal Details")}><span className="icon">👤</span> Update Personal Details <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("Change Password")}><span className="icon">🔒</span> Change Password <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("Update Language")}><span className="icon">🌐</span> Update Language <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("Download Documents")}><span className="icon">📄</span> Download Documents <span className="arrow">›</span></li>
            </ul>
          </div>

          <div className="motivational-card">
            <div className="motivational-content">
              <h3>"Drive with confidence.<br/>We're with you."</h3>
              <p>— Stugo Team</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVehicleContent = () => {
    return (
      <div className="vehicle-view dashboard-grid">
        <div className="center-col">
          
          <div className="vehicle-hero-card">
            <div className="vehicle-image">
              <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80" alt="Maruti Suzuki Dzire" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
            </div>
            <div className="vehicle-hero-info">
              <div className="vehicle-title-row">
                <h2>Maruti Suzuki Dzire</h2>
                <span className="status-pill active">● Active</span>
              </div>
              <p className="license-plate">KA 01 MG 4587</p>
              
              <div className="vehicle-tags">
                <span className="v-tag">🚗 Sedan</span>
                <span className="v-tag">⛽ Petrol</span>
                <span className="v-tag">👥 5 Seater</span>
              </div>
              
              <div className="vehicle-verified-banner">
                <div className="verified-text">
                  <div className="v-icon">🛡️</div>
                  <div>
                    <h4>Vehicle verified</h4>
                    <p>Your vehicle is approved for rides.</p>
                  </div>
                </div>
                <button className="btn-update-details" onClick={() => handleActionClick("Update Details")}>✎ Update Details</button>
              </div>
            </div>
          </div>

          <div className="vehicle-info-row">
            <div className="v-info-item">
              <div className="v-icon-top">🚗</div>
              <p className="v-label">Make & Model</p>
              <p className="v-value">Maruti Suzuki Dzire</p>
            </div>
            <div className="v-info-item">
              <div className="v-icon-top">📅</div>
              <p className="v-label">Year of Manufacture</p>
              <p className="v-value">2021</p>
            </div>
            <div className="v-info-item">
              <div className="v-icon-top">⛽</div>
              <p className="v-label">Fuel Type</p>
              <p className="v-value">Petrol</p>
            </div>
            <div className="v-info-item">
              <div className="v-icon-top">👥</div>
              <p className="v-label">Seating Capacity</p>
              <p className="v-value">5 Seater</p>
            </div>
          </div>

          <div className="vehicle-section-card">
            <div className="section-header">
              <h3>📄 Documents & Verification</h3>
              <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); handleActionClick("View All Documents"); }}>View All</a>
            </div>
            <div className="docs-grid-4">
              <div className="doc-box">
                <div className="doc-box-icon blue">📄</div>
                <h4>RC (Registration Certificate)</h4>
                <p>KA01MG4587</p>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
              <div className="doc-box">
                <div className="doc-box-icon purple">📑</div>
                <h4>Commercial Permit</h4>
                <p>KA-2021-045678</p>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
              <div className="doc-box">
                <div className="doc-box-icon blue">🛡️</div>
                <h4>Insurance</h4>
                <p>Valid till 12 Aug 2025</p>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
              <div className="doc-box">
                <div className="doc-box-icon green">🍃</div>
                <h4>Pollution Certificate</h4>
                <p>Valid till 15 Nov 2024</p>
                <div className="doc-status verified">✔ Verified</div>
                <span className="arrow">›</span>
              </div>
            </div>
          </div>

          <div className="vehicle-section-card">
            <div className="section-header">
              <h3>📷 Vehicle Photos</h3>
              <a href="#" className="view-all-link" onClick={(e) => { e.preventDefault(); handleActionClick("View All Photos"); }}>View All Photos →</a>
            </div>
            <div className="photos-grid">
              <div className="photo-item">
                <div className="photo-placeholder img-front"></div>
                <p>Front View</p>
              </div>
              <div className="photo-item">
                <div className="photo-placeholder img-back"></div>
                <p>Back View</p>
              </div>
              <div className="photo-item">
                <div className="photo-placeholder img-side"></div>
                <p>Side View</p>
              </div>
              <div className="photo-item">
                <div className="photo-placeholder img-inside"></div>
                <p>Inside View</p>
              </div>
            </div>
          </div>

          <div className="important-reminder-card">
            <div className="reminder-icon">ℹ️</div>
            <div>
              <h4>Important Reminder</h4>
              <p>Keep your insurance, RC and fitness certificate valid to keep your account active.</p>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); handleActionClick("Learn More Reminder"); }}>Learn More →</a>
          </div>

        </div>
        
        <div className="right-col">
          <div className="vehicle-status-banner">
            <div className="status-banner-content">
              <div className="status-icon">🛡️</div>
              <div>
                <h3>Your vehicle is fully verified!</h3>
                <p>You can continue receiving ride requests.</p>
              </div>
            </div>
            <div className="status-car-illustration">🚗</div>
          </div>

          <div className="quick-actions-card vehicle-actions">
            <h3>⚡ Quick Actions</h3>
            <ul className="actions-list">
              <li onClick={() => handleActionClick("Update Vehicle Details")}><span className="icon">✏️</span> Update Vehicle Details <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("Upload Documents")}><span className="icon">☁️</span> Upload Documents <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("View Vehicle Photos")}><span className="icon">🖼️</span> View Vehicle Photos <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("Request Inspection")}><span className="icon">🛡️</span> Request Inspection <span className="arrow">›</span></li>
            </ul>
          </div>

          <div className="help-card dark-card" onClick={() => setActiveTab("support")}>
            <div className="help-icon">🎧</div>
            <div>
              <h4>Need Help?</h4>
              <p>Our support team is available 24/7 for you.</p>
            </div>
            <span className="arrow">›</span>
          </div>

          <div className="safety-first-card">
            <div className="icon">🛡️</div>
            <div>
              <h4>Safety First</h4>
              <p>Keep your documents updated to avoid any ride disruptions.</p>
            </div>
            <span className="arrow">›</span>
          </div>
        </div>
      </div>
    );
  };


  const activeRideData = pendingRide || selectedDemoRide;

  return (
    <div className="driver-dashboard">
      <aside className="driver-sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Stugo Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </div>
        <nav className="sidebar-nav">
          <a href="#" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>🏠 Home</a>
          <a href="#" className={activeTab === 'rides' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('rides'); }}>🚗 My Rides</a>
          <a href="#" className={activeTab === 'earnings' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('earnings'); }}>💳 Earnings</a>
          <a href="#" className={activeTab === 'profile' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('profile'); }}>👤 Profile</a>
          <a href="#" className={activeTab === 'vehicle' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('vehicle'); }}>📋 Vehicle Details</a>
        </nav>
        <div className="sidebar-footer">
          <div className="footer-graphic">📍</div>
          <p>More rides.<br/>More earnings.<br/>With Stugo.</p>
        </div>
      </aside>

      <main className="driver-main">
        <header className="driver-header">
          <div className="header-greeting">
            <h1>
              {activeTab === 'rides' ? 'Ride History 🚗' : 
               activeTab === 'earnings' ? 'Good Morning, Raju! 👋' :
               activeTab === 'profile' ? 'My Profile' :
               activeTab === 'vehicle' ? '🚗 Vehicle Details' :
               'Good Morning, Driver! 👋'}
            </h1>
            <p>
              {activeTab === 'rides' ? 'View and track all your past rides.' : 
               activeTab === 'earnings' ? 'Here\'s how much you\'ve earned and your earnings breakdown.' :
               activeTab === 'profile' ? 'Manage your personal details, documents and account information.' :
               activeTab === 'vehicle' ? 'Manage your vehicle information and keep your documents up to date.' :
               'Stay online, get more rides, earn more.'}
            </p>
          </div>
          <div className="header-profile">
            <span className="icon-bell" onClick={() => handleActionClick("Notifications")}>🔔</span>
            <div className="profile-info" onClick={() => setActiveTab("profile")} style={{cursor: 'pointer'}}>
              <div className="profile-pic"></div>
              <div>
                <div className="profile-name">Raju Kumar</div>
                <div className="profile-role">Driver</div>
              </div>
              <span className="arrow" style={{marginLeft: '4px'}}>∨</span>
            </div>
          </div>
        </header>

        {activeTab === 'home' ? renderHomeContent() : null}
        {activeTab === 'rides' ? renderMyRidesContent() : null}
        {activeTab === 'earnings' ? renderEarningsContent() : null}
        {activeTab === 'profile' ? renderProfileContent() : null}
        {activeTab === 'vehicle' ? renderVehicleContent() : null}
        {activeTab !== 'home' && activeTab !== 'rides' && activeTab !== 'earnings' && activeTab !== 'profile' && activeTab !== 'vehicle' ? (
          <div className="placeholder-content">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard</h2>
            <p>This section is under construction.</p>
          </div>
        ) : null}
      </main>

      {/* Ride Request Modal */}
      {activeRideData && (
        <div className="ride-request-overlay" style={{ backdropFilter: 'blur(4px)', background: 'rgba(15, 23, 42, 0.6)' }}>
          <div className="ride-request-modal" style={{ width: '90%', maxWidth: '420px', padding: '24px', borderRadius: '16px', background: '#ffffff', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', textAlign: 'left' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', color: '#0F172A' }}>Detailed Trip Information</h2>
            
            {/* Passenger Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="https://i.pravatar.cc/150?img=5" alt="Passenger" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '16px', color: '#0F172A' }}>Priya S.</div>
                  <div style={{ fontSize: '13px', color: '#2563EB', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    ID Verified
                  </div>
                </div>
              </div>
              <div style={{ fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#F59E0B' }}>⭐</span> 4.5
              </div>
            </div>

            {/* Route */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A' }}>Route</span>
              <span style={{ fontSize: '13px', color: '#0284C7', fontWeight: 500 }}>14 min to destination</span>
            </div>
            
            <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ height: '100px', width: '100%', background: '#E2E8F0', position: 'relative' }}>
                <iframe 
                  title="Route Thumbnail"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.64%2C12.83%2C77.68%2C12.86&amp;layer=mapnik" 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', filter: 'contrast(1.1) brightness(0.95)' }}
                ></iframe>
              </div>
              <div style={{ background: '#F8FAFC', padding: '12px', fontSize: '13px', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div>
                  <strong>{activeRideData.pickup}</strong>
                </div>
                <div style={{ borderLeft: '2px dashed #CBD5E1', height: '12px', margin: '0 0 8px 3px' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <strong>{activeRideData.dropoff}</strong>
                </div>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A', marginBottom: '8px' }}>Fare Breakdown</div>
            <div style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>Base Fare:</span><span>₹20</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>Distance (e.g., {activeRideData.distance} km):</span><span>₹{Math.round(activeRideData.distance * 12)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>Platform Fee & Taxes:</span><span>₹10</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E2E8F0', fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>
                <span>Total Estimated:</span><span>₹{activeRideData.fare}</span>
              </div>
            </div>

            {/* Ride Specifications */}
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A', marginBottom: '8px' }}>Ride Specifications</div>
            <div style={{ fontSize: '13px', color: '#475569', marginBottom: '20px', lineHeight: '1.6' }}>
              <div>Vehicle Type: {activeRideData.vehicle || 'Auto Rickshaw (Yellow)'}</div>
              <div>Seats Booked: 2 of 3</div>
              <div>Trip ID: STU-{Math.floor(Math.random() * 9000) + 1000}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', color: '#1D4ED8', padding: '4px 10px', borderRadius: '20px', fontWeight: 500, marginTop: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Student Verification
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleAcceptRide} style={{ flex: 1, background: '#10B981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Accept</button>
              <button onClick={handleDeclineRide} style={{ padding: '12px 16px', background: '#94A3B8', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Decline</button>
              <button style={{ flex: 1, background: '#3B82F6', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Message</button>
              <button style={{ padding: '12px 16px', background: '#22C55E', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>📞</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
