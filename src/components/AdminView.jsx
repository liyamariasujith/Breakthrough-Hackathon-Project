import React, { useState } from 'react';
import './DriverView.css'; // Reusing dashboard styles

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('support');

  const handleActionClick = (action) => {
    alert(`Clicked ${action}`);
  };

  const renderSupportContent = () => {
    return (
      <div className="support-view dashboard-grid">
        <div className="center-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="support-stats-row">
            <div className="support-stat-card">
              <div className="icon-container blue">🎫</div>
              <div className="stat-info">
                <p>Open Tickets</p>
                <h3>42</h3>
                <span className="trend positive">↑ 12% vs. last 7 days</span>
              </div>
            </div>
            <div className="support-stat-card">
              <div className="icon-container purple">⏳</div>
              <div className="stat-info">
                <p>In Progress</p>
                <h3>28</h3>
                <span className="trend positive">↑ 8% vs. last 7 days</span>
              </div>
            </div>
            <div className="support-stat-card">
              <div className="icon-container green">✓</div>
              <div className="stat-info">
                <p>Resolved</p>
                <h3>76</h3>
                <span className="trend positive">↑ 18% vs. last 7 days</span>
              </div>
            </div>
            <div className="support-stat-card">
              <div className="icon-container yellow">⚠️</div>
              <div className="stat-info">
                <p>Urgent</p>
                <h3>9</h3>
                <span className="trend negative">↑ 50% vs. last 7 days</span>
              </div>
            </div>
          </div>

          <div className="support-charts-row">
            <div className="chart-card trend-chart">
              <div className="chart-header">
                <h3>📊 Support Ticket Trend</h3>
                <select className="date-select"><option>Last 7 Days</option></select>
              </div>
              <div className="chart-body">
                {/* Mock line chart */}
                <svg width="100%" height="100%" viewBox="0 0 500 150" preserveAspectRatio="none" style={{ marginTop: '20px' }}>
                  <path d="M0,100 C50,80 100,120 150,90 C200,60 250,70 300,50 C350,30 400,60 450,20 L500,0 L500,150 L0,150 Z" fill="rgba(59, 130, 246, 0.1)" />
                  <path d="M0,100 C50,80 100,120 150,90 C200,60 250,70 300,50 C350,30 400,60 450,20 L500,0" fill="none" stroke="#3B82F6" strokeWidth="3" />
                  <circle cx="50" cy="88" r="4" fill="#3B82F6" />
                  <circle cx="150" cy="94" r="4" fill="#3B82F6" />
                  <circle cx="250" cy="67" r="4" fill="#3B82F6" />
                  <circle cx="350" cy="38" r="4" fill="#3B82F6" />
                  <circle cx="450" cy="30" r="4" fill="#3B82F6" />
                </svg>
                <div className="x-axis">
                  <span>Sep 20</span><span>Sep 21</span><span>Sep 22</span><span>Sep 23</span><span>Sep 24</span><span>Sep 25</span><span>Sep 26</span>
                </div>
              </div>
            </div>

            <div className="chart-card category-chart">
              <div className="chart-header">
                <h3>⏱️ Tickets by Category</h3>
              </div>
              <div className="donut-chart-container">
                <div className="donut-circle">
                  <div className="donut-center">
                    <h4>210</h4>
                    <p>Total</p>
                  </div>
                </div>
                <div className="legend-list">
                  <div className="legend-item"><span className="dot blue"></span> <span className="label">Booking Problem</span> <span className="val">52 (25%)</span></div>
                  <div className="legend-item"><span className="dot green"></span> <span className="label">Ride Cancellation</span> <span className="val">38 (18%)</span></div>
                  <div className="legend-item"><span className="dot orange"></span> <span className="label">Payment Issue</span> <span className="val">34 (16%)</span></div>
                  <div className="legend-item"><span className="dot purple"></span> <span className="label">Driver Issue</span> <span className="val">28 (13%)</span></div>
                  <div className="legend-item"><span className="dot teal"></span> <span className="label">Vehicle/Document...</span> <span className="val">27 (13%)</span></div>
                  <div className="legend-item"><span className="dot gray"></span> <span className="label">Lost Item</span> <span className="val">18 (9%)</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="support-bottom-row">
            <div className="recent-tickets-card">
              <div className="section-header">
                <h3>🏷️ Recent Support Tickets</h3>
                <a href="#" className="view-all-link">View All</a>
              </div>
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Issue</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>STG-1042</td>
                    <td>Priya Nair</td>
                    <td>Ride cancelled by driver</td>
                    <td>Ride Cancellation</td>
                    <td><span className="priority high">High</span></td>
                    <td><span className="status in-progress">In Progress</span></td>
                    <td>10:24 AM</td>
                  </tr>
                  <tr>
                    <td>STG-1041</td>
                    <td>Rahul Sharma</td>
                    <td>Payment failed</td>
                    <td>Payment Issue</td>
                    <td><span className="priority medium">Medium</span></td>
                    <td><span className="status open">Open</span></td>
                    <td>09:50 AM</td>
                  </tr>
                  <tr>
                    <td>STG-1040</td>
                    <td>Amit Verma</td>
                    <td>Driver not arrived</td>
                    <td>Driver Issue</td>
                    <td><span className="priority high">High</span></td>
                    <td><span className="status in-progress">In Progress</span></td>
                    <td>09:12 AM</td>
                  </tr>
                  <tr>
                    <td>STG-1039</td>
                    <td>Sneha Patel</td>
                    <td>Vehicle not suitable</td>
                    <td>Vehicle / Document</td>
                    <td><span className="priority medium">Medium</span></td>
                    <td><span className="status resolved">Resolved</span></td>
                    <td>08:47 AM</td>
                  </tr>
                  <tr>
                    <td>STG-1038</td>
                    <td>Vikram Singh</td>
                    <td>Lost item in vehicle</td>
                    <td>Lost Item</td>
                    <td><span className="priority low">Low</span></td>
                    <td><span className="status open">Open</span></td>
                    <td>08:20 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="common-issues-card">
              <div className="section-header">
                <h3>👤 Common Customer Issues</h3>
              </div>
              <ul className="issues-list">
                <li>
                  <div className="issue-icon blue">📅</div>
                  <div className="issue-text">
                    <h4>Booking Problem</h4>
                    <p>Unable to book or modify ride</p>
                  </div>
                  <span className="arrow">›</span>
                </li>
                <li>
                  <div className="issue-icon yellow">✖️</div>
                  <div className="issue-text">
                    <h4>Ride Cancellation</h4>
                    <p>Cancel or refund related issues</p>
                  </div>
                  <span className="arrow">›</span>
                </li>
                <li>
                  <div className="issue-icon green">💸</div>
                  <div className="issue-text">
                    <h4>Payment Issue</h4>
                    <p>Payment failure or refund</p>
                  </div>
                  <span className="arrow">›</span>
                </li>
                <li>
                  <div className="issue-icon purple">👤</div>
                  <div className="issue-text">
                    <h4>Driver Issue</h4>
                    <p>Driver not arrived / behavior</p>
                  </div>
                  <span className="arrow">›</span>
                </li>
                <li>
                  <div className="issue-icon teal">🚗</div>
                  <div className="issue-text">
                    <h4>Vehicle / Document Issue</h4>
                    <p>Vehicle condition or documents</p>
                  </div>
                  <span className="arrow">›</span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
        
        <div className="right-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="help-support-banner">
            <div className="help-banner-icon">🚌</div>
            <h3>Help & Support</h3>
            <p>We're here to assist you 24/7 for a safer and smoother journey.</p>
            <div className="online-badge">● Online</div>
            <div className="response-time">
              <span className="icon">⏱️</span>
              <div>
                <span className="label">Avg. Response Time</span>
                <span className="val">12 min</span>
              </div>
            </div>
          </div>

          <div className="quick-actions-card support-actions">
            <h3>⚡ Quick Actions</h3>
            <ul className="actions-list rich-actions">
              <li onClick={() => handleActionClick("Create Support Ticket")}><div className="icon blue">➕</div> <div className="text-col"><h4>Create Support Ticket</h4><p>Raise a new issue</p></div> <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("View All Tickets")}><div className="icon purple">📋</div> <div className="text-col"><h4>View All Tickets</h4><p>Track your requests</p></div> <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("Contact Customer")}><div className="icon green">📞</div> <div className="text-col"><h4>Contact Customer</h4><p>Call or email support</p></div> <span className="arrow">›</span></li>
              <li onClick={() => handleActionClick("Help & FAQ")}><div className="icon dark">🛡️</div> <div className="text-col"><h4>Help & FAQ</h4><p>Find quick answers</p></div> <span className="arrow">›</span></li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="driver-dashboard admin-dashboard">
      <aside className="driver-sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Stugo Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </div>
        <nav className="sidebar-nav">
          <a href="#" className={activeTab === 'support' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('support'); }}>🎧 Support</a>
        </nav>
        <div className="sidebar-footer">
          <div className="footer-graphic">📍</div>
          <p>More rides,<br/>More connections,<br/>With <strong>Stugo.</strong></p>
        </div>
      </aside>

      <main className="driver-main">
        <header className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F172A', padding: '20px 32px' }}>
          <div>
            <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>
              {activeTab === 'support' ? '🎧 Support Dashboard' :
               `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard`}
            </h1>
            <p style={{ color: '#94A3B8', margin: '8px 0 0 0', fontSize: '14px' }}>
              {activeTab === 'support' ? 'Here\'s what\'s happening with your support system today.' :
               'Manage your operations efficiently.'}
            </p>
          </div>
          <div className="header-profile" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ fontSize: '24px' }}>🔔</span>
              <span style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%', border: '2px solid #0F172A' }}></span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#3B82F6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>MK</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>Manoj Kumar</span>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>Support Team</span>
            </div>
          </div>
        </header>

        <div className="main-content">
          {activeTab === 'support' ? renderSupportContent() : (
            <div className="placeholder-content">
              <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard</h2>
              <p>This section is under construction.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
