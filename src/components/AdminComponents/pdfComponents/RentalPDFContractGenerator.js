import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useI18next } from "gatsby-plugin-react-i18next";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 14,
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
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tableHeaderCell: {
    padding: 8,
    fontWeight: "bold",
    fontSize: 10,
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  totalRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: "#000",
    fontWeight: "bold",
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: "40%",
  },
  signature: {
    marginTop: 10,
    width: 150,
    height: 90,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderColor: "#000",
    marginTop: 10,
    marginBottom: 5,
  },
  signatureLineClient: {
    borderTopWidth: 1,
    borderColor: "#000",
    marginTop: 110,
    marginBottom: 5,
  },
  stamp: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 100,
    height: 100,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
  },
});

const ContractPDF = ({ formData, companyInfo }) => {
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const companyStamp = companyInfo.companyStamp.url;
  const signature = companyInfo.signature.url;
  // Calculate subtotal, taxes and total
  const subtotal = formData.selectedItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
    0,
  );
  const taxRate = 0; // 0% tax
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  // Calculate deposit
  const depositRate = 0.6; // 50% deposit
  const depositAmount = totalAmount * depositRate;
  const balanceDue = totalAmount - depositAmount;

  // Format date
  const eventDate = formData.eventDate
    ? format(new Date(formData.eventDate), "MMMM d, yyyy")
    : "[DATE]";

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>RENTAL ITEMS AGREEMENT</Text>

        <Text style={styles.paragraph}>
          This Rental Agreement (the "Agreement") is made and entered into on{" "}
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
          WHEREAS THE CLIENT wishes to rent certain event items from THE
          COMPANY;
        </Text>
        <Text style={styles.paragraph}>
          AND WHEREAS THE COMPANY agrees to provide such rental items in
          accordance with the terms and conditions set forth in this Agreement;
        </Text>
        <Text style={styles.paragraph}>
          NOW, THEREFORE, THE FOLLOWING HAS BEEN AGREED AND STIPULATED:
        </Text>

        {/* Section 1 */}
        <Text style={styles.sectionTitle}>1. RENTAL ITEMS</Text>
        <Text style={styles.paragraph}>
          1.1 THE COMPANY agrees to rent to THE CLIENT the following items for
          use at {formData.eventType} on {eventDate}:
        </Text>

        {/* Rental Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Item</Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "center" }]}
            >
              Unit Price
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "center" }]}
            >
              Quantity
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}
            >
              Total
            </Text>
          </View>

          {/* Table Rows */}
          {formData.selectedItems.map((item, index) => (
            <View key={index}>
              <View
                style={[
                  styles.tableRow,
                  { borderBottomWidth: item.description ? 0 : 1 },
                ]}
              >
                <Text style={[styles.tableCell, { flex: 3 }]}>
                  {item.rentalItem}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "center" }]}
                >
                  ${parseFloat(item.price).toFixed(2)}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "center" }]}
                >
                  {item.quantity}
                </Text>
                <Text
                  style={[styles.tableCell, { flex: 1, textAlign: "right" }]}
                >
                  $
                  {(parseFloat(item.price) * parseInt(item.quantity)).toFixed(
                    2,
                  )}
                </Text>
              </View>
              {item.description && (
                <View
                  style={[
                    styles.tableRow,
                    { borderBottomWidth: 1, borderTopWidth: 0 },
                  ]}
                >
                  <Text
                    style={[
                      styles.tableCell,
                      {
                        flex: 6,
                        fontSize: 9,
                        color: "#666666",
                        fontStyle: "italic",
                      },
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
              )}
            </View>
          ))}

          {/* Total */}
          <View style={[styles.totalRow]}>
            <Text style={[styles.tableCell, { flex: 3 }]}></Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, textAlign: "right", fontWeight: "bold" },
              ]}
            >
              TOTAL:
            </Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, textAlign: "right", fontWeight: "bold" },
              ]}
            >
              ${totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </Page>

      {/* Second Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.paragraph}>
          1.2 The rental items will be delivered to and picked up from{" "}
          {formData.eventLocation}.
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>2. RENTAL PERIOD</Text>
        <Text style={styles.paragraph}>
          2.1 The rental period begins on {eventDate} at{" "}
          {formData.eventStartTime} and ends on {eventDate} at{" "}
          {formData.eventEndTime}.
        </Text>
        <Text style={styles.paragraph}>
          2.2 Extensions of the rental period must be agreed upon in writing and
          may incur additional charges.
        </Text>

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>3. PRICE AND PAYMENT TERMS</Text>
        <Text style={styles.paragraph}>
          3.1 The total rental fee is ${totalAmount.toFixed(2)}, which includes
          all items listed in Section 1 and applicable taxes.
        </Text>
        <Text style={styles.paragraph}>
          3.2 THE CLIENT agrees to make a deposit of ${depositAmount.toFixed(2)}{" "}
          (60% of the total rental fee) upon signing this Agreement.
        </Text>
        <Text style={styles.paragraph}>
          3.3 The remaining balance of ${balanceDue.toFixed(2)} must be paid no
          later than 3 days before the rental period begins.
        </Text>
        <Text style={styles.paragraph}>
          3.4 All payments are non-refundable except as otherwise provided in
          this Agreement.
        </Text>

        {/* Section 4 */}
        <Text style={styles.sectionTitle}>4. DELIVERY, SETUP, AND PICKUP</Text>
        <Text style={styles.paragraph}>
          4.1 THE COMPANY will deliver the rental items to{" "}
          {formData.eventLocation} on {eventDate} at a time to be agreed upon by
          both parties.
        </Text>
        <Text style={styles.paragraph}>
          4.2 Setup and teardown services are{" "}
          {formData.setupIncluded ? "included in" : "not included in"} the
          rental fee.
        </Text>
        <Text style={styles.paragraph}>
          4.3 THE COMPANY will pick up the rental items from the same location
          on {eventDate} at {formData.eventEndTime} or at a time agreed upon by
          both parties.
        </Text>
        <Text style={styles.paragraph}>
          4.4 THE CLIENT must ensure that all rental items are accessible for
          pickup at the agreed time.
        </Text>

        {/* Section 5 */}
        <Text style={styles.sectionTitle}>5. CLIENT RESPONSIBILITIES</Text>
        <Text style={styles.paragraph}>5.1 THE CLIENT agrees to:</Text>
        <Text style={styles.listItem}>
          a) Use all rental items for their intended purpose and in a safe
          manner
        </Text>
        <Text style={styles.listItem}>
          b) Not alter, modify, or repair any rental items without written
          permission
        </Text>
        <Text style={styles.listItem}>
          c) Supervise and control the use of rental items
        </Text>
        <Text style={styles.listItem}>
          d) Return all items in the same condition as received, ordinary wear
          and tear excepted
        </Text>
        <Text style={styles.listItem}>
          e) Be responsible for any damage, loss, or theft of rental items
          during the rental period
        </Text>
      </Page>

      {/* Third Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 6 */}
        <Text style={styles.sectionTitle}>6. DAMAGES AND REPLACEMENT</Text>
        <Text style={styles.paragraph}>
          6.1 THE CLIENT will be charged for any items that are damaged, lost,
          stolen, or not returned.
        </Text>
        <Text style={styles.paragraph}>
          6.2 Charges for damaged or missing items will be based on replacement
          cost.
        </Text>
        <Text style={styles.paragraph}>
          6.3 THE CLIENT agrees to pay the difference within 7 days of being
          notified.
        </Text>

        {/* Section 7 */}
        <Text style={styles.sectionTitle}>
          7. CANCELLATION AND RESCHEDULING
        </Text>
        <Text style={styles.paragraph}>7.1 Cancellation by THE CLIENT:</Text>
        <Text style={styles.listItem}>
          a) More than 30 days before the event: 70% of the deposit will be
          refunded
        </Text>
        <Text style={styles.listItem}>
          b) 15-30 days before the event: 50% of the deposit will be refunded
        </Text>
        <Text style={styles.listItem}>
          c) 7-14 days before the event: 25% of the deposit will be refunded
        </Text>
        <Text style={styles.listItem}>
          d) Less than 7 days before the event: No refund will be issued
        </Text>

        <Text style={styles.paragraph}>
          7.2 In case of adverse weather conditions or circumstances beyond THE
          COMPANY's control, the rental may be rescheduled to an alternative
          date mutually agreed upon by both parties, subject to availability.
        </Text>

        {/* Section 8 */}
        <Text style={styles.sectionTitle}>
          8. LIABILITY AND INDEMNIFICATION
        </Text>
        <Text style={styles.paragraph}>
          8.1 THE COMPANY shall maintain liability insurance for the rental
          items.
        </Text>
        <Text style={styles.paragraph}>
          8.2 THE CLIENT agrees to indemnify and hold THE COMPANY harmless from
          any claims, losses, damages, liabilities, costs or expenses arising
          from THE CLIENT's use of the rental items or breach of this Agreement.
        </Text>
        <Text style={styles.paragraph}>
          8.3 THE COMPANY is not responsible for any injury or damage caused by
          the use of rental items.
        </Text>

        {/* Section 9 */}
        <Text style={styles.sectionTitle}>9. FORCE MAJEURE</Text>
        <Text style={styles.paragraph}>
          Neither party shall be liable for failure to perform under this
          Agreement due to circumstances beyond their reasonable control,
          including but not limited to acts of God, natural disasters,
          governmental restrictions, or other unforeseen catastrophes.
        </Text>
      </Page>

      {/* Fourth Page */}
      <Page size="A4" style={styles.page}>
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
            <Image src={signature} style={styles.signature} />
            <View style={styles.signatureLine} />
            <Text>{formData.representativeName}</Text>
            <Text>Representative</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text>CLIENT</Text>
            <View style={styles.signatureLineClient} />
            <Text>{formData.clientName}</Text>
          </View>
        </View>

        {/* Company Stamp - Absolute Positioned */}

        <Image src={companyStamp} style={styles.stamp} />
      </Page>
    </Document>
  );
};

const RentalPDFContractGenerator = ({ formData, companyInfo, stampImage }) => {
  const { language } = useI18next();

  const getFileName = () => {
    const date = format(new Date(), "yyyy-MM-dd");
    return `Sertuin_Events_Rental_${formData.clientName.replace(/\s+/g, "_")}_${date}.pdf`;
  };

  return (
    <PDFDownloadLink
      document={
        <ContractPDF
          formData={formData}
          companyInfo={companyInfo}
          stampImage={stampImage}
        />
      }
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
  );
};

export default RentalPDFContractGenerator;
