# Stugo - Student Ride Booking Platform

Stugo is a React-based single-page web application (SPA) designed to provide fast, safe, and affordable auto rides specifically tailored for college life. The platform connects students with verified local drivers, offering upfront pricing, student discounts, and a streamlined booking experience.

## Features & Architecture

The application is built entirely in React and operates without a traditional routing library (`react-router`), instead relying on global state management in `App.jsx` to dynamically render role-specific views.

### 1. Unified Authentication Portal
A full-screen login gateway secures the platform and dynamically routes users to their specific dashboard based on their credentials.
- **Customer:** `customer` / `customer123`
- **Driver:** `driver` / `driver123`
- **Admin:** `admin` / `admin123`

### 2. Customer Dashboard (`CustomerView.jsx`)
- **Location Validation:** Users must select pick-up and drop-off locations from a predefined list of supported campus locations and hostels (e.g., PES University, Amrita Hostel).
- **Dynamic Fare & Distance Calculation:** The app calculates the real-world distance between the selected coordinates using the Haversine formula. The fare is dynamically calculated as `₹30 + (Distance in km * ₹12)`.
- **Live Estimation:** A UI component displays the estimated distance and fare *before* the user clicks book.
- **Ride State Management:** Upon booking, the ride enters a `pending` state. The customer awaits driver acceptance.
- **OTP & Handoff:** Once a driver accepts the ride, the customer receives an interactive modal showing a 4-digit OTP, driver details, and vehicle details.

### 3. Driver Dashboard (`DriverView.jsx`)
- **Interactive Map:** Embeds an interactive OpenStreetMap view indicating the driver's current status and zone.
- **Incoming Ride Modal:** A high-fidelity, detailed trip information modal pops up when a customer requests a ride (or when simulating an upcoming ride). It features:
  - Passenger profile and verification badge
  - Mini route map thumbnail with pick-up/drop-off text
  - Complete fare breakdown (Base Fare, Distance Cost, Taxes)
  - Action buttons to **Accept**, **Decline**, **Message**, or **📞 Call**.
- **Metrics:** Track earnings, online time, insurance balance, and vehicle details.

### 4. Admin Support Dashboard (`AdminView.jsx`)
- A dedicated support interface for platform administrators to manage queries and oversee operations.

## Data Structure

Supported locations and their respective latitude/longitude coordinates are stored in `src/data/locations.js`. This data is used for both validation and distance computation. 
A helper function `getDistance(lat1, lon1, lat2, lon2)` handles the mathematical distance calculation.

## Tech Stack

- **Frontend:** React (JSX)
- **Styling:** CSS (Modularized per component)
- **Maps:** OpenStreetMap Embed API (Requires no API Keys)

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Installation
1. Clone the repository and navigate into the project directory:
   ```bash
   cd Breakthrough
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm start
```
The application will open in your default browser at `http://localhost:3000`.

## Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Launches the test runner.
