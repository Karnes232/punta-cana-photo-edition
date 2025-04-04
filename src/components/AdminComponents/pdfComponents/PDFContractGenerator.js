import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import axios from "axios";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 1.2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  subSection: {
    marginLeft: 20,
    marginBottom: 5,
  },
  listItem: {
    marginLeft: 15,
    marginBottom: 5,
  },
  table: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: "40%",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderColor: "#000",
    marginTop: 40,
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
  letter: {
    paddingLeft: 10,
  },
});

const ContractPDF = ({ formData, companyInfo }) => {
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const totalPrice = (
    parseFloat(formData.packagePrice) +
    formData.additions.reduce(
      (sum, addition) => sum + parseFloat(addition.price || 0),
      0,
    )
  ).toFixed(2);

  const downPayment = (totalPrice * 0.6).toFixed(2);
  const remainingBalance = (totalPrice - downPayment).toFixed(2);
  const eventLocation = formData.eventLocation;
  const eventDate = formData.eventDate
    ? format(new Date(formData.eventDate), "MMMM d, yyyy")
    : "[DATE]";
  const eventStartTime = formData.eventStartTime;
  const eventEndTime = formData.eventEndTime;

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>SERVICE AGREEMENT FOR EVENT PLANNING</Text>

        <Text style={styles.paragraph}>
          This Service Agreement (the "Agreement") is made and entered into on{" "}
          {currentDate}
        </Text>

        <Text style={styles.paragraph}>
          Between: Sertuin Events, a company duly incorporated under the laws of
          the Dominican Republic, represented in this act by{" "}
          {formData.representativeName}, holder of RNC No. {companyInfo.rnc},
          hereinafter referred to as "THE COMPANY";
        </Text>

        <Text style={styles.paragraph}>
          And: {formData.clientName}, holder of ID No. {formData.clientId}, with
          email address {formData.clientEmail} and phone number{" "}
          {formData.clientPhone}, hereinafter referred to as "THE CLIENT";
        </Text>

        {/* WHEREAS Clauses */}
        <Text style={styles.paragraph}>
          WHEREAS THE CLIENT wishes to engage THE COMPANY to provide certain
          event planning services;
        </Text>
        <Text style={styles.paragraph}>
          AND WHEREAS THE COMPANY agrees to provide such services in accordance
          with the terms and conditions set forth in this Agreement;
        </Text>
        <Text style={styles.paragraph}>
          NOW, THEREFORE, THE FOLLOWING HAS BEEN AGREED AND STIPULATED:
        </Text>

        {/* Section 1 */}
        <Text style={styles.sectionTitle}>1. PURPOSE OF THE AGREEMENT</Text>
        <Text style={styles.paragraph}>
          1.1 THE COMPANY agrees to provide THE CLIENT with the event planning
          services for {formData.eventType} under the "{formData.package}"
          package, which includes:
        </Text>
        <Text style={styles.paragraph}>{formData.packagesDescription}</Text>
      </Page>

      {/* Second Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.paragraph}>
          1.2 Additional Items Requested by the Client:
        </Text>

        {/* Additional Items List */}
        <View style={[styles.table, { width: "80%" }]}>
          {/* Table Header */}
          <View
            style={[
              styles.tableRow,
              { backgroundColor: "#f5f5f5", borderBottomWidth: 2 },
            ]}
          >
            <Text style={[styles.tableCell, { flex: 3 }]}>Item</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Price (USD)</Text>
          </View>
          {formData.additions.length > 0 ? (
            formData.additions.map((item, index) => (
              <React.Fragment key={index}>
                {/* Item and Price Row */}
                <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                  <Text style={[styles.tableCell, { flex: 3 }]}>
                    • {item.addition}
                  </Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>
                    ${item.price}
                  </Text>
                </View>
                {/* Description Row */}
                <View
                  style={[
                    styles.tableRow,
                    { borderBottomWidth: 0, marginBottom: 10 },
                  ]}
                >
                  <Text
                    style={[
                      styles.tableCell,
                      {
                        flex: 4,
                        fontStyle: "italic",
                        fontSize: 10,
                        marginLeft: 20,
                      },
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
              </React.Fragment>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 4 }]}>
                No additional items selected
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.paragraph}>
          1.3 The service will be provided on the date and time agreed upon by
          both parties, at the location specified in Section 3 of this
          Agreement.
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>2. PRICE AND PAYMENT TERMS</Text>
        <Text style={styles.paragraph}>
          2.1 The total price for the "{formData.package}" package including all
          additional items is ${totalPrice}.
        </Text>
        <Text style={styles.paragraph}>
          2.2 THE CLIENT agrees to make an initial payment (down payment) of 60%
          of the total price, equivalent to ${downPayment}, upon signing this
          Agreement.
        </Text>
        <Text style={styles.paragraph}>
          2.3 The remaining balance of ${remainingBalance} must be paid in cash,
          credit/debit card, or bank transfer no later than 7 days before the
          event date.
        </Text>
        <Text style={styles.paragraph}>
          2.4 All payments are non-refundable except as otherwise provided in
          this Agreement.
        </Text>

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>3. LOCATION AND SERVICE DETAILS</Text>
        <Text style={styles.paragraph}>
          3.1 The event will take place at {eventLocation}, on {eventDate} from{" "}
          {eventStartTime} to {eventEndTime}.
        </Text>
        <Text style={styles.paragraph}>
          3.2 THE CLIENT and their guests must comply with all venue policies
          and regulations.
        </Text>
        <Text style={styles.paragraph}>
          3.3 THE COMPANY will provide transportation for equipment and staff as
          necessary for the event.
        </Text>
      </Page>

      {/* Third Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 4 */}
        <Text style={styles.sectionTitle}>
          4. RESPONSIBILITIES AND CONDITIONS
        </Text>
        <Text style={styles.paragraph}>
          4.1 THE COMPANY's Responsibilities:
        </Text>
        <Text style={styles.listItem}>
          a) To provide all services described in Section 1 with professional
          care and skill
        </Text>
        <Text style={styles.listItem}>
          b) To coordinate with vendors and suppliers as necessary
        </Text>
        <Text style={styles.listItem}>
          c) To perform timely setup and breakdown of event elements
        </Text>
        <Text style={styles.listItem}>
          d) To maintain appropriate insurance coverage for the event
        </Text>
        <Text style={styles.listItem}>
          e) To address any reasonable concerns raised by THE CLIENT during the
          planning process
        </Text>

        <Text style={styles.paragraph}>4.2 THE CLIENT's Responsibilities:</Text>
        <Text style={styles.listItem}>
          a) To provide accurate information related to the event
        </Text>
        <Text style={styles.listItem}>
          b) To make payments according to the schedule outlined in Section 2
        </Text>
        <Text style={styles.listItem}>
          c) To notify THE COMPANY of any changes at least 30 days in advance
        </Text>
        <Text style={styles.listItem}>
          d) To obtain any necessary permits or permissions not expressly
          included in this Agreement
        </Text>
        <Text style={styles.listItem}>
          e) To ensure guests conduct themselves appropriately during the event
        </Text>

        {/* Section 5 */}
        <Text style={styles.sectionTitle}>5. CHANGES AND MODIFICATIONS</Text>
        <Text style={styles.paragraph}>
          5.1 Any changes to the services, date, time, or location must be
          requested in writing at least 30 days before the event date.
        </Text>
        <Text style={styles.paragraph}>
          5.2 THE COMPANY will make reasonable efforts to accommodate requested
          changes but cannot guarantee availability.
        </Text>
        <Text style={styles.paragraph}>
          5.3 Additional services requested after signing this Agreement will be
          subject to additional fees as determined by THE COMPANY.
        </Text>
        <Text style={styles.paragraph}>
          5.4 Changes requested with less than 30 days' notice may not be
          accommodated and/or may incur substantial additional charges.
        </Text>

        {/* Section 6 */}
        <Text style={styles.sectionTitle}>
          6. CANCELLATION AND RESCHEDULING
        </Text>
        <Text style={styles.paragraph}>6.1 Cancellation by THE CLIENT:</Text>
        <Text style={styles.listItem}>
          a) In case of cancellation by THE CLIENT for any reason, the down
          payment is non-refundable.
        </Text>
        <Text style={styles.listItem}>
          b) If cancelled less than 7 days before the event: The full contract
          amount is due and non-refundable.
        </Text>

        <Text style={styles.paragraph}>
          6.2 In case of adverse weather conditions or circumstances beyond THE
          COMPANY's control, the event may be rescheduled to an alternative date
          mutually agreed upon by both parties, subject to availability.
        </Text>
      </Page>

      {/* Fourth Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 7 */}
        <Text style={styles.sectionTitle}>
          7. LIABILITY AND INDEMNIFICATION
        </Text>
        <Text style={styles.paragraph}>
          7.1 THE COMPANY shall maintain liability insurance for the event.
        </Text>
        <Text style={styles.paragraph}>
          7.2 THE CLIENT agrees to indemnify and hold THE COMPANY harmless from
          any claims, losses, damages, liabilities, costs or expenses arising
          from THE CLIENT's breach of this Agreement or the negligent acts of
          THE CLIENT or their guests.
        </Text>
        <Text style={styles.paragraph}>
          7.3 THE COMPANY's total liability under this Agreement shall not
          exceed the total amount paid by THE CLIENT.
        </Text>

        {/* Section 8 */}
        <Text style={styles.sectionTitle}>8. INTELLECTUAL PROPERTY</Text>
        <Text style={styles.paragraph}>
          8.1 THE COMPANY reserves the right to use photographs and videos taken
          during the event for promotional purposes unless otherwise agreed in
          writing.
        </Text>
        <Text style={styles.paragraph}>
          8.2 THE CLIENT grants THE COMPANY permission to use their likeness in
          such promotional materials unless specifically prohibited in writing.
        </Text>

        {/* Section 9 */}
        <Text style={styles.sectionTitle}>9. FORCE MAJEURE</Text>
        <Text style={styles.paragraph}>
          Neither party shall be liable for failure to perform under this
          Agreement due to circumstances beyond their reasonable control,
          including but not limited to acts of God, natural disasters,
          governmental restrictions, or other unforeseen catastrophes.
        </Text>

        {/* Section 10 */}
        <Text style={styles.sectionTitle}>
          10. GOVERNING LAW AND DISPUTE RESOLUTION
        </Text>
        <Text style={styles.paragraph}>
          10.1 This Agreement shall be governed by the laws of the Dominican
          Republic.
        </Text>
        <Text style={styles.paragraph}>
          10.2 Any disputes arising out of or in connection with this Agreement
          shall first be attempted to be resolved through negotiation. If
          negotiation fails, the dispute shall be submitted to mediation and, if
          necessary, arbitration through the Centro de Resolución Alternativa de
          Controversias (CRC) of the Chamber of Commerce and Production of Santo
          Domingo in accordance with its rules and procedures.
        </Text>

        {/* Section 11 */}
        <Text style={styles.sectionTitle}>11. ENTIRE AGREEMENT</Text>
        <Text style={styles.paragraph}>
          This Agreement constitutes the entire understanding between the
          parties and supersedes all prior negotiations, understandings, and
          agreements, whether oral or written.
        </Text>
      </Page>

      {/* Fourth Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 12 */}
        <Text style={styles.sectionTitle}>12. ACCEPTANCE OF THE PARTIES</Text>
        <Text style={styles.paragraph}>
          As a sign of agreement and acceptance of the conditions established
          herein, both parties sign this contract in two copies on the date of
          its execution.
        </Text>
        <Text style={styles.paragraph}>
          IN Santo Domingo, Dominican Republic, {currentDate}.
        </Text>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text>Sertuin Events</Text>
            <View style={styles.signatureLine} />
            <Text>{formData.representativeName}</Text>
            <Text>Representative</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text>CLIENT</Text>
            <View style={styles.signatureLine} />
            <Text>{formData.clientName}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PDFContractGenerator = ({ formData, companyInfo }) => {
  const { language } = useI18next();

  const sendQuoteEmail = async () => {
    console.log(formData);
    try {
      const pdfDoc = (
        <ContractPDF
          formData={formData}
          companyInfo={companyInfo}
          language={language}
        />
      );
      const pdfBlob = await pdf(pdfDoc).toBlob();

      if (pdfBlob.size === 0) {
        throw new Error("Generated PDF is empty");
      }

      const pdfBase64 = await blobToBase64(pdfBlob);

      // Send the language preference along with the email data
      const response = await axios.post(
        "/.netlify/functions/sendContractEmail",
        {
          name: formData.clientName,
          email: formData.clientEmail,
          pdf: pdfBase64,
          language: language,
        },
      );

      if (response.status === 200) {
        alert(
          language === "es"
            ? "Cotización enviada exitosamente al cliente!"
            : "Quote sent successfully to the client!",
        );
      }
    } catch (error) {
      console.error("Error sending quote email:", error);
      alert(
        language === "es"
          ? "Error al enviar la cotización. Por favor, inténtelo de nuevo."
          : "Failed to send quote. Please try again.",
      );
    }
  };

  // Helper function to convert Blob to Base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const getFileName = () => {
    const date = format(new Date(), "yyyy-MM-dd");
    return `Sertuin_Events_Contract_${formData.clientName.replace(/\s+/g, "_")}_${date}.pdf`;
  };

  return (
    <div className="flex flex-col space-y-4 items-center mt-6">
      <PDFDownloadLink
        document={<ContractPDF formData={formData} companyInfo={companyInfo} />}
        fileName={getFileName()}
        className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
      >
        {({ loading }) =>
          loading
            ? language === "es"
              ? "Generando Contrato..."
              : "Generating Contract..."
            : language === "es"
              ? "Descargar Contrato"
              : "Download Contract"
        }
      </PDFDownloadLink>
      <button
        onClick={sendQuoteEmail}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        <Trans>Email Quote to Client</Trans>
      </button>
    </div>
  );
};

export default PDFContractGenerator;
