import React from "react";

const WeddingQuestaionnaireForm = ({ formData }) => {
  return (
    <>
      <form
        //onSubmit={handleSubmit}
        action={`/contact/thankyou/?name=${formData.name}`}
        className="space-y-4"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="weddingQuestionnaireForm"
        id="weddingQuestionnaireForm"
      >
        <div className="hidden">
          <input
            type="hidden"
            name="form-name"
            value="weddingQuestionnaireForm"
          />
          <input
            type="text"
            name="fullName1"
            defaultValue={formData.fullName1}
          />
          <input
            type="text"
            name="fullName2"
            defaultValue={formData.fullName2}
          />
          <input type="email" name="email" defaultValue={formData.email} />
          <input type="tel" name="phone" defaultValue={formData.phone} />
          <input
            type="date"
            name="weddingDate"
            defaultValue={formData.weddingDate}
          />
          <input
            type="text"
            name="estimatedTime"
            defaultValue={formData.estimatedTime}
          />
          <input
            type="number"
            name="guestCount"
            defaultValue={formData.guestCount}
          />
          <input
            type="text"
            name="desiredLocations"
            defaultValue={formData.desiredLocations}
          />
          <input
            type="text"
            name="ceremonyType"
            defaultValue={formData.ceremonyType}
          />
          <input
            type="text"
            name="hotelStay"
            defaultValue={formData.hotelStay}
          />
          <input
            type="checkbox"
            name="needTransportation"
            defaultValue={formData.needTransportation}
          />
          <input
            type="text"
            name="weddingStyles"
            defaultValue={formData.weddingStyles}
          />
          <input
            type="text"
            name="colorPalette"
            defaultValue={formData.colorPalette}
          />
          <input
            type="text"
            name="chairStyle"
            defaultValue={formData.chairStyle}
          />
          <input
            type="text"
            name="centerpieceStyle"
            defaultValue={formData.centerpieceStyle}
          />
          <input
            type="text"
            name="additionalExperiences"
            defaultValue={formData.additionalExperiences}
          />
          <input type="number" name="budget" defaultValue={formData.budget} />
          <input
            type="text"
            name="dreamDescription"
            defaultValue={formData.dreamDescription}
          />
           <input type="file" name="inspirationImages-0" />
        <input type="file" name="inspirationImages-1" />
        <input type="file" name="inspirationImages-2" />
        <input type="file" name="inspirationImages-3" />
        <input type="file" name="inspirationImages-4" />
        </div>
      </form>
    </>
  );
};

export default WeddingQuestaionnaireForm;
