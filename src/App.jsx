import React, { useState } from "react";
import Hero3D from "./components/Hero3D";
import BookingCard from "./components/BookingCard";
import Steps from "./components/Steps";
import DriverView from "./components/DriverView";
import CustomerView from "./components/CustomerView";
import AdminView from "./components/AdminView";

export default function App() {
  const [currentView, setCurrentView] = useState("login");
  const [pendingRide, setPendingRide] = useState(null);
  
  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "customer" && password === "customer123") {
      setCurrentView("customer");
    } else if (username === "driver" && password === "driver123") {
      setCurrentView("driver");
    } else if (username === "admin" && password === "admin123") {
      setCurrentView("admin");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  if (currentView === "login") {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0F172A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src="/logo.png" alt="Stugo Logo" style={{ height: '60px', objectFit: 'contain', marginBottom: '16px' }} />
            <h2 style={{ margin: 0, color: '#1E293B', fontSize: '24px' }}>Welcome to Stugo</h2>
            <p style={{ margin: '8px 0 0 0', color: '#64748B', fontSize: '14px' }}>Please sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', fontSize: '16px' }}
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', fontSize: '16px' }}
                placeholder="Enter your password"
                required
              />
            </div>
            {loginError && <p style={{ color: '#EF4444', fontSize: '14px', margin: 0 }}>{loginError}</p>}
            <button type="submit" style={{ background: '#3B82F6', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', marginTop: '8px' }}>
              Sign In
            </button>
          </form>
          
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#94A3B8' }}>
            Hint: Use <strong>customer</strong>, <strong>driver</strong>, or <strong>admin</strong> (password is same + 123)
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "customer") {
    return (
      <div style={{ position: 'relative' }}>
        <CustomerView 
          activeRide={pendingRide}
          onRideRequest={(ride) => {
            setPendingRide(ride);
          }} 
          onRideReset={() => setPendingRide(null)}
        />
        
        <button onClick={() => setCurrentView('login')} style={{ position: 'fixed', bottom: '20px', left: '20px', background: '#EF4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          🚪 Logout
        </button>
      </div>
    );
  }

  if (currentView === "driver") {
    return (
      <div style={{ position: 'relative' }}>
        <DriverView 
          pendingRide={pendingRide && pendingRide.status === 'pending' ? pendingRide : null} 
          onRideRespond={(response) => {
            if (response === 'accept') {
              setPendingRide({ ...pendingRide, status: 'accepted' });
            } else {
              setPendingRide(null);
            }
          }} 
        />
        
        <button onClick={() => setCurrentView('login')} style={{ position: 'fixed', bottom: '20px', left: '20px', background: '#EF4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          🚪 Logout
        </button>
      </div>
    );
  }

  if (currentView === "admin") {
    return (
      <div style={{ position: 'relative' }}>
        <AdminView />
        
        <button onClick={() => setCurrentView('login')} style={{ position: 'fixed', bottom: '20px', left: '20px', background: '#EF4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          🚪 Logout
        </button>
      </div>
    );
  }

  return null;
}
