
import { useState } from "react";
import "./Services.css";

const WHATSAPP_NUMBER = "918126995944";

const treatments = [
  {
    name: "Abhyanga Massage",
    duration: "60 minutes",
    price: "₹1,499",
    icon: "🌿",
    description:
      "A traditional Ayurvedic full-body oil massage designed for relaxation and a calming wellness experience.",
  },
  {
    name: "Shirodhara",
    duration: "45 minutes",
    price: "₹1,299",
    icon: "🪷",
    description:
      "A traditional wellness treatment involving a gentle stream of warm oil across the forehead.",
  },
  {
    name: "Head & Shoulder Massage",
    duration: "30 minutes",
    price: "₹799",
    icon: "✨",
    description:
      "A soothing massage experience focused on the head, neck and shoulders.",
  },
  {
    name: "Ayurvedic Facial",
    duration: "45 minutes",
    price: "₹999",
    icon: "🌸",
    description:
      "A relaxing facial experience inspired by traditional Ayurvedic skincare rituals.",
  },
  {
    name: "Back & Neck Therapy",
    duration: "45 minutes",
    price: "₹1,099",
    icon: "🍃",
    description:
      "A focused massage experience for the back, neck and shoulder area.",
  },
  {
    name: "Foot Massage",
    duration: "30 minutes",
    price: "₹699",
    icon: "🪴",
    description:
      "A relaxing foot massage designed to make your wellness visit feel complete.",
  },
];

function Services() {
  const [selected, setSelected] = useState(treatments[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");

  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  function bookAppointment(event) {
    event.preventDefault();

    const message = [
      "Namaste Tridosha Ayurvedic Massage Center!",
      "",
      "I would like to request an appointment.",
      "",
      `Treatment: ${selected.name}`,
      `Duration: ${selected.duration}`,
      `Listed price: ${selected.price}`,
      `Customer name: ${customerName.trim()}`,
      `Customer phone: ${customerPhone.trim()}`,
      `Preferred date: ${bookingDate}`,
      `Preferred time: ${bookingTime || "Flexible"}`,
      `Additional notes: ${notes.trim() || "None"}`,
      "",
      "Please confirm availability and final pricing.",
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="section-heading">
          <span className="eyebrow">YOUR WELLNESS JOURNEY</span>
          <h2>Treatments designed around you.</h2>
          <p>
            Discover traditional Ayurvedic-inspired treatments in a peaceful,
            welcoming wellness environment.
          </p>
        </div>

        <div className="treatment-grid">
          {treatments.map((treatment) => (
            <article
              className={`treatment-card ${
                selected.name === treatment.name ? "selected" : ""
              }`}
              key={treatment.name}
            >
              <div className="treatment-icon" aria-hidden="true">
                {treatment.icon}
              </div>

              <div className="treatment-card-heading">
                <h3>{treatment.name}</h3>
                <span className="treatment-price">{treatment.price}</span>
              </div>

              <p className="treatment-duration">{treatment.duration}</p>
              <p className="treatment-description">{treatment.description}</p>

              <button
                className="treatment-button"
                type="button"
                onClick={() => {
                  setSelected(treatment);
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Select treatment <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>

        <div className="booking-panel" id="booking">
          <div className="booking-intro">
            <span className="eyebrow">TAKE A MOMENT FOR YOURSELF</span>
            <h2>Book your wellness visit.</h2>
            <p>
              Share your preferred appointment details. We’ll open WhatsApp
              with your booking request so you can send it to our team.
            </p>

            <div className="selected-treatment">
              <span className="selected-treatment-icon">{selected.icon}</span>
              <div>
                <span className="selected-label">YOUR SELECTED TREATMENT</span>
                <h3>{selected.name}</h3>
                <p>
                  {selected.duration} <span>·</span> {selected.price}
                </p>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={bookAppointment}>
            <label htmlFor="customer-name">Full name *</label>
            <input
              id="customer-name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              required
            />

            <label htmlFor="customer-phone">Phone number *</label>
            <input
              id="customer-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="[0-9+\s()-]{8,20}"
              placeholder="Enter your contact number"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              required
            />

            <div className="booking-field-row">
              <div>
                <label htmlFor="booking-date">Preferred date *</label>
                <input
                  id="booking-date"
                  type="date"
                  min={localToday}
                  value={bookingDate}
                  onChange={(event) => setBookingDate(event.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="booking-time">Preferred time</label>
                <select
                  id="booking-time"
                  value={bookingTime}
                  onChange={(event) => setBookingTime(event.target.value)}
                >
                  <option value="">Flexible</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>
              </div>
            </div>

            <label htmlFor="booking-notes">Additional notes (optional)</label>
            <textarea
              id="booking-notes"
              rows="3"
              placeholder="Any preferences or questions?"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />

            <button className="booking-submit" type="submit">
              Request appointment on WhatsApp <span aria-hidden="true">↗</span>
            </button>

            <p className="booking-disclaimer">
              Your appointment is not confirmed until our team replies.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Services;
