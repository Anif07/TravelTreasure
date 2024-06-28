import React from "react";
import "../../styles/homePage/services.css";

function Services() {
  return (
    <div className="servicesContainer">
      <div>
        <h1>Services</h1>
      </div>
      <div className="services">
        <div className="singleService">
          <i className="fa-solid fa-box-open"></i>
          <h1>Customized Travel Packages</h1>
          <p>
            Our travel packages are like personalized recipes, tailored just for
            you. Whether you crave a romantic getaway, a family adventure, or a
            solo expedition, we mix the perfect blend of destinations,
            activities, and accommodations to suit your taste.
          </p>
        </div>
        <div className="singleService">
          <i className="material-symbols-outlined">travel</i>
          <h1>Flight Bookings</h1>
          <p>
            Booking flights with us is like choosing from a menu of top
            airlines. We serve up the best deals and smoothest booking
            experience, with options to add extras like baggage and seat
            preferences to your order.
          </p>
        </div>
        <div className="singleService">
          <i className="fa-solid fa-hotel"></i>
          <h1>Hotel Reservations</h1>
          <p>
            Our hotel reservations are like a buffet of options, offering
            everything from cozy stays to luxurious resorts. We dish out
            competitive rates, detailed descriptions, and easy booking to ensure
            you find the perfect place to stay.
          </p>
        </div>
        <div className="singleService">
          <i className="material-symbols-outlined">health_and_safety</i>
          <h1>Travel Insurance</h1>
          <p>
            Travel insurance with us is like having a safety net for your trip.
            We provide coverage for unexpected bumps in the road, like trip
            cancellations or medical emergencies, ensuring your journey is
            smooth and worry-free.
          </p>
        </div>
        <div className="singleService">
          <i className="material-symbols-outlined">hiking</i>
          <h1>Adventures</h1>
          <p>
            Embark on exciting adventures with us, like exploring a diverse menu
            of outdoor activities. From thrilling hikes and bike rides to
            wildlife encounters, our experienced guides spice up your travel
            experience with unforgettable flavors of excitement.
          </p>
        </div>
        <div className="singleService">
          <i className="fa-solid fa-utensils"></i>
          <h1>Food & Drinks</h1>
          <p>
            Indulge in our culinary offerings, served with a side of local
            flavor. Our food experiences include food tours that are like
            tasting menus of the best local cuisines, cooking classes that add a
            dash of hands-on fun, and exclusive dining experiences that leave
            you craving more.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
