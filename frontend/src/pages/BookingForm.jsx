import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const BookingForm = () => {
  const [form, setForm] = useState({
    resourceId: "",
    bookingDate: "",
    timeSlot: "",
  });

  const submitBooking = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("bookings/", form);
      alert("Booking Created!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitBooking}>
      <input
        placeholder="Resource ID"
        onChange={(e) =>
          setForm({ ...form, resourceId: e.target.value })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, bookingDate: e.target.value })
        }
      />

      <input
        placeholder="Time Slot"
        onChange={(e) =>
          setForm({ ...form, timeSlot: e.target.value })
        }
      />

      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;
