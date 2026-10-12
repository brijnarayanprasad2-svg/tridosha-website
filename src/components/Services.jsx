import { useState } from "react";
import "./Services.css";
import { supabase } from "../lib/supabase";

// WhatsApp number: country code + number, without +, spaces or dashes.
const MANAGER_WHATSAPP = "918126995944";

const treatments = [
  {
    name: "Pinda Swedana",
    duration: "60 minutes",
    price: 1800,
    icon: "🌿",
    image: "/treatments/AYN_Pinda-Swedana.jpg",
    description:
      "A traditional warming therapy using herbal boluses and rhythmic massage techniques.",
  },
  {
    name: "Head Massage",
    duration: "30 minutes",
    price: 600,
    icon: "✨",
    image: "/treatments/headmassage.jpg",
    description:
      "A calming scalp and head massage created for a peaceful pause in your day.",
  },
  {
    name: "Foot Massage",
    duration: "30 minutes",
    price: 700,
    icon: "🪴",
    image: "/treatments/footrelexology.jpg",
    description:
      "Gentle, soothing massage focused on tired feet and everyday relaxation.",
  },
  {
    name: "Foot Reflexology",
    duration: "30 minutes",
    price: 800,
    icon: "🌸",
    image: "/treatments/footmassage.jpg",
    description:
      "A focused foot treatment using pressure-point techniques in a tranquil setting.",
  },
  {
    name: "Back Massage",
    duration: "30 minutes",
    price: 700,
    icon: "🍃",
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85",
    description:
      "A restorative massage concentrating on the back and areas that feel tight.",
  },
  {
    name: "Neck & Shoulder Massage",
    duration: "30 minutes",
    price: 700,
    icon: "🪷",
    image: "/treatments/neck.jpg",
    description:
      "A relaxing, focused treatment for the neck and shoulders after a busy day.",
  },
  {
    name: "Hot Oil Massage",
    duration: "45 minutes",
    price: 1000,
    icon: "🫧",
    image: "/treatments/hot-oil-massage.jpg",
    description:
      "Warm massage oils and flowing movements create a comforting wellness ritual.",
  },
  {
    name: "Deep Tissue Massage",
    duration: "60 minutes",
    price: 1500,
    icon: "💆",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85",
    description:
      "A firmer, targeted massage for areas of muscular tension. Pressure can be discussed with your therapist.",
  },
  {
    name: "Herbal Powder Massage (Udvartana)",
    duration: "60 minutes",
    price: 1800,
    icon: "🌱",
    image: "/treatments/herbal.jpg",
    description:
      "An Ayurvedic-inspired body treatment using herbal powders and traditional massage strokes.",
  },
  {
    name: "Aromatherapy Massage",
    duration: "60 minutes",
    price: 1500,
    icon: "🌼",
    image: "/treatments/aromatherapy.jpg",
    description:
      "A sensory massage experience with aromatic oils and a calm, unhurried atmosphere.",
  },
  {
    name: "Abhiynga Massage",
    duration: "60 minutes",
    price: 1800,
    icon: "🌿",
    image: "/treatments/Abhyanga.jpg",
    description:
      "A traditional full-body Ayurvedic oil massage designed around a soothing wellness experience.",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function getWhatsAppUrl(booking) {
  const message = [
    "Namaste Tridosha Ayurvedic Massage Center!",
    "",
    "New Booking Request",
    `Request ID: ${booking.request_code}`,
    `Customer: ${booking.customer_name}`,
    `Phone: ${booking.customer_phone}`,
    `Treatment: ${booking.treatment}`,
    `Duration: ${booking.duration}`,
    `Price: ${formatPrice(booking.listed_price)}`,
    `Preferred date: ${booking.preferred_date}`,
    `Preferred time: ${booking.preferred_time}`,
    `Notes: ${booking.notes}`,
    "",
    "Please contact the customer to confirm availability.",
  ].join("\n");

  return `https://wa.me/${MANAGER_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

// Keeps the layout intact if an image is missing or fails to load.
function TreatmentImage({ src, alt, className, loading = "lazy" }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className || ""} treatment-image-fallback`}
        role="img"
        aria-label={`${alt}. Image unavailable.`}
      >
        <span aria-hidden="true">🌿</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
}

function Services() {
  const [selected, setSelected] = useState(treatments[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [whatsappNotice, setWhatsappNotice] = useState("");

  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  async function bookAppointment(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setFormError("");
    setWhatsappNotice("");

    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.trim();
    const phoneDigits = cleanPhone.replace(/\D/g, "");
    const cleanNotes = notes.trim() || "None";

    if (cleanName.length < 2) {
      setFormError("Please enter your full name.");
      return;
    }

    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      setFormError("Please enter a valid phone number (8–15 digits).");
      return;
    }

    if (!bookingDate || bookingDate < localToday) {
      setFormError("Please choose today or a future date.");
      return;
    }

    const bookingCode = `TRI-${Date.now().toString().slice(-6)}`;

    const booking = {
      request_code: bookingCode,
      customer_name: cleanName,
      customer_phone: cleanPhone,
      treatment: selected.name,
      duration: selected.duration,
      listed_price: selected.price,
      preferred_date: bookingDate,
      preferred_time: bookingTime || "Flexible",
      notes: cleanNotes,
    };

    const whatsappUrl = getWhatsAppUrl(booking);
    let whatsappWindow = null;

    // Open a tab during the submit event to reduce popup-blocker issues.
    try {
      whatsappWindow = window.open("about:blank", "_blank");

      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.document.title = "Preparing your booking message";
        whatsappWindow.document.body.textContent =
          "Your booking is being saved. Please wait...";
      }
    } catch (popupError) {
      console.warn("WhatsApp tab could not be prepared:", popupError);
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("booking_requests")
        .insert([booking]);

      if (error) {
        console.error("Supabase booking error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });

        if (whatsappWindow && !whatsappWindow.closed) {
          whatsappWindow.close();
        }

        setFormError(
          error.code === "23505"
            ? "This request code already exists. Please submit again."
            : "We couldn't save your request. Please try again or contact our team."
        );
        return;
      }

      setSubmittedBooking({
        id: booking.request_code,
        name: booking.customer_name,
        phone: booking.customer_phone,
        treatment: booking.treatment,
        duration: booking.duration,
        price: booking.listed_price,
        date: booking.preferred_date,
        time: booking.preferred_time,
        notes: booking.notes,
        whatsappUrl,
      });

      setCustomerName("");
      setCustomerPhone("");
      setBookingDate("");
      setBookingTime("");
      setNotes("");

      // Open WhatsApp only after Supabase confirms the save.
      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.location.href = whatsappUrl;
        setWhatsappNotice(
          "Your booking was saved. WhatsApp is opening with the message ready to send."
        );
      } else {
        setWhatsappNotice(
          "Your booking was saved. Use the WhatsApp button below to open the prefilled message."
        );
      }

      window.setTimeout(() => {
        document
          .getElementById("booking-confirmation")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch (error) {
      console.error("Unexpected booking error:", error);

      if (whatsappWindow && !whatsappWindow.closed) {
        whatsappWindow.close();
      }

      setFormError("A connection problem occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function selectTreatment(treatment) {
    setSelected(treatment);
    setSubmittedBooking(null);
    setFormError("");
    setWhatsappNotice("");

    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bookAnotherAppointment() {
    setSubmittedBooking(null);
    setFormError("");
    setWhatsappNotice("");

    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
              <div className="treatment-image-wrap">
                <TreatmentImage
                  className="treatment-image"
                  src={treatment.image}
                  alt={`${treatment.name} wellness treatment`}
                />
                <span className="treatment-image-badge">
                  {treatment.duration}
                </span>
              </div>

              <div className="treatment-icon" aria-hidden="true">
                {treatment.icon}
              </div>

              <div className="treatment-card-heading">
                <h3>{treatment.name}</h3>
                <span className="treatment-price">
                  {formatPrice(treatment.price)}
                </span>
              </div>

              <p className="treatment-duration">{treatment.duration}</p>
              <p className="treatment-description">{treatment.description}</p>

              <button
                className="treatment-button"
                type="button"
                onClick={() => selectTreatment(treatment)}
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
              Choose your treatment and preferred appointment details using the
              form. We will review your request and confirm availability.
            </p>

            <div className="selected-treatment selected-treatment-feature">
              <TreatmentImage
                className="selected-treatment-image"
                src={selected.image}
                alt={`${selected.name} selected treatment`}
              />
              <div className="selected-treatment-copy">
                <span className="selected-label">
                  YOUR SELECTED TREATMENT
                </span>
                <h3>{selected.name}</h3>
                <p>{selected.description}</p>
                <div className="selected-treatment-meta">
                  <span>{selected.duration}</span>
                  <strong>{formatPrice(selected.price)}</strong>
                </div>
              </div>
            </div>
          </div>

          <form className="booking-form" onSubmit={bookAppointment}>
            <label htmlFor="customer-name">Full name *</label>
            <input
              id="customer-name"
              name="customerName"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              required
              minLength={2}
              maxLength={100}
            />

            <label htmlFor="customer-phone">Phone number *</label>
            <input
              id="customer-phone"
              name="customerPhone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="Enter your contact number"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              required
              minLength={8}
              maxLength={20}
            />

            <div className="booking-field-row">
              <div>
                <label htmlFor="booking-date">Preferred date *</label>
                <input
                  id="booking-date"
                  name="bookingDate"
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
                  name="bookingTime"
                  value={bookingTime}
                  onChange={(event) => setBookingTime(event.target.value)}
                >
                  <option value="">Flexible</option>
                  {[
                    "10:00 AM",
                    "11:00 AM",
                    "12:00 PM",
                    "1:00 PM",
                    "2:00 PM",
                    "3:00 PM",
                    "4:00 PM",
                    "5:00 PM",
                    "6:00 PM",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label htmlFor="booking-notes">Additional notes (optional)</label>
            <textarea
              id="booking-notes"
              name="notes"
              rows={3}
              placeholder="Any preferences or questions?"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              maxLength={500}
            />

            {formError && (
              <p className="booking-error" role="alert">
                {formError}
              </p>
            )}

            <button
              className="booking-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving your request…"
                : "Submit booking request"}
              {!isSubmitting && <span aria-hidden="true"> ✓</span>}
            </button>

            <p className="booking-disclaimer">
              Your request is stored when submission succeeds. Your appointment
              is not confirmed until our team contacts you.
            </p>
          </form>
        </div>

        {submittedBooking && (
          <div
            className="booking-success"
            id="booking-confirmation"
            role="status"
            aria-live="polite"
          >
            <div className="success-icon" aria-hidden="true">
              ✓
            </div>

            <span className="eyebrow">REQUEST RECEIVED</span>
            <h2>Thank you, {submittedBooking.name}!</h2>

            <p className="success-message">
              Your booking request has been saved. Please keep your request ID
              for reference.
            </p>

            <div className="confirmation-details">
              <p>
                <span>Request ID</span>
                <strong>{submittedBooking.id}</strong>
              </p>
              <p>
                <span>Treatment</span>
                <strong>{submittedBooking.treatment}</strong>
              </p>
              <p>
                <span>Duration</span>
                <strong>{submittedBooking.duration}</strong>
              </p>
              <p>
                <span>Listed price</span>
                <strong>{formatPrice(submittedBooking.price)}</strong>
              </p>
              <p>
                <span>Preferred date</span>
                <strong>{submittedBooking.date}</strong>
              </p>
              <p>
                <span>Preferred time</span>
                <strong>{submittedBooking.time}</strong>
              </p>
              <p>
                <span>Contact number</span>
                <strong>{submittedBooking.phone}</strong>
              </p>
              <p>
                <span>Additional notes</span>
                <strong>{submittedBooking.notes}</strong>
              </p>
            </div>

            {whatsappNotice && (
              <p className="success-message" role="status">
                {whatsappNotice}
              </p>
            )}

            <a
              className="treatment-button confirmation-button"
              href={submittedBooking.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp message <span aria-hidden="true">↗</span>
            </a>

            <p className="success-note">
              WhatsApp opens with your booking details prefilled. Review the
              message and press Send yourself. Your appointment remains
              unconfirmed until our team confirms availability.
            </p>

            <button
              className="treatment-button confirmation-button"
              type="button"
              onClick={bookAnotherAppointment}
            >
              Make another request <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
