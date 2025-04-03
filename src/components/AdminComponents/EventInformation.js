import React from "react";
import { Trans } from "gatsby-plugin-react-i18next";

const EventInformation = ({ formData, setFormData }) => {
  return (
    <>
      <h4 className="text-2xl mb-5 font-bold">
        <Trans>Event Information</Trans>
      </h4>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="eventType"
          id="eventType"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.eventType}
          onChange={(e) =>
            setFormData({ ...formData, eventType: e.target.value })
          }
        />
        <label htmlFor="eventType" className="contactFormLabel">
          <Trans>Event Type</Trans>
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="text"
          name="eventLocation"
          id="eventLocation"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.eventLocation}
          onChange={(e) =>
            setFormData({ ...formData, eventLocation: e.target.value })
          }
        />
        <label htmlFor="eventLocation" className="contactFormLabel">
          <Trans>Location</Trans>
        </label>
      </div>

      <div className="relative z-0 mb-6 w-full group">
        <input
          type="date"
          name="eventDate"
          id="eventDate"
          className="contactFormInput peer"
          placeholder=" "
          required
          value={formData.eventDate}
          onChange={(e) =>
            setFormData({ ...formData, eventDate: e.target.value })
          }
        />
        <label htmlFor="eventDate" className="contactFormLabel">
          <Trans>Date</Trans>
        </label>
      </div>

      <div className="flex gap-4">
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="time"
            name="eventStartTime"
            id="eventStartTime"
            className="contactFormInput peer"
            placeholder=" "
            required
            value={formData.eventStartTime}
            onChange={(e) =>
              setFormData({ ...formData, eventStartTime: e.target.value })
            }
          />
          <label htmlFor="eventStartTime" className="contactFormLabel">
            <Trans>Start Time</Trans>
          </label>
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <input
            type="time"
            name="eventEndTime"
            id="eventEndTime"
            className="contactFormInput peer"
            placeholder=" "
            required
            value={formData.eventEndTime}
            onChange={(e) =>
              setFormData({ ...formData, eventEndTime: e.target.value })
            }
          />
          <label htmlFor="eventEndTime" className="contactFormLabel">
            <Trans>End Time</Trans>
          </label>
        </div>
      </div>
    </>
  );
};

export default EventInformation;
