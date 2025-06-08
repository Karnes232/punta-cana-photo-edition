import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
  pdf,
} from "@react-pdf/renderer";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { format } from "date-fns";
import axios from "axios";

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

const ContractPDF = ({ formData, companyInfo, language }) => {
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const companyStamp = companyInfo.companyStamp.url;
  const signature = companyInfo.signature.url;
  // Calculate subtotal, taxes and total
  const subtotal = formData.selectedItems.reduce((sum, item) => {
    const originalPrice = parseFloat(item.price) * parseInt(item.quantity);
    const discount = item.discount ? originalPrice * (item.discount / 100) : 0;
    return sum + (originalPrice - discount);
  }, 0);
  const taxRate = 0.18; // 18% ITBIS tax
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  // Calculate deposit
  const depositRate = formData.depositPercentage
    ? formData.depositPercentage / 100
    : 0.6;
  const depositAmount = formData.deposit || totalAmount * depositRate;
  const balanceDue = totalAmount - depositAmount;

  // Format date
  const eventDate = formData.eventDate
    ? format(new Date(formData.eventDate), "MMMM d, yyyy")
    : "[DATE]";

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          {language === "es"
            ? "ACUERDO DE ALQUILER DE ARTÍCULOS"
            : "RENTAL ITEMS AGREEMENT"}
        </Text>

        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>
                Este Acuerdo de Alquiler
              </Text>
              {` (el "Acuerdo") se celebra el ${currentDate}`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>This Rental Agreement</Text>
              {` (the "Agreement") is made and entered into on ${currentDate}`}
            </React.Fragment>
          )}
        </Text>

        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>Entre:</Text>
              {` Sertuin Events, una empresa debidamente constituida bajo las leyes de la República Dominicana, representada en este acto por ${formData.representativeName}, titular del RNC No. ${companyInfo.rnc}, en lo adelante denominada "LA EMPRESA`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>Between:</Text>
              {` Sertuin Events, a company duly incorporated under the laws of the Dominican Republic, represented in this act by ${formData.representativeName}, holder of RNC No. ${companyInfo.rnc}, hereinafter referred to as "THE COMPANY";`}
            </React.Fragment>
          )}
        </Text>

        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>Y:</Text>
              {` ${formData.clientName}, titular de la cédula No. ${formData.clientId}, con correo electrónico ${formData.clientEmail} y teléfono ${formData.clientPhone}, en lo adelante denominado "EL CLIENTE";`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>And:</Text>
              {` ${formData.clientName}, holder of ID No. ${formData.clientId}, with email address ${formData.clientEmail} and phone number ${formData.clientPhone}, hereinafter referred to as "THE CLIENT";`}
            </React.Fragment>
          )}
        </Text>

        {/* WHEREAS Clauses */}
        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>Donde:</Text>
              {` EL CLIENTE desea alquilar ciertos artículos de evento de LA EMPRESA;`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>WHEREAS:</Text>
              {` THE CLIENT wishes to rent certain event items from THE COMPANY;`}
            </React.Fragment>
          )}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>Y DONDE:</Text>
              {` LA EMPRESA está de acuerdo en proporcionar tales artículos de alquiler en conformidad con los términos y condiciones establecidos en este Acuerdo;`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>AND WHEREAS:</Text>
              {` THE COMPANY agrees to provide such rental items in accordance with the terms and conditions set forth in this Agreement;`}
            </React.Fragment>
          )}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>
                AHORA, POR LO TANTO, SE HA ACORDADO Y ESTIPULADO LO SIGUIENTE:
              </Text>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>
                NOW, THEREFORE, THE FOLLOWING HAS BEEN AGREED AND STIPULATED:
              </Text>
            </React.Fragment>
          )}
        </Text>

        {/* Section 1 */}
        <Text style={styles.sectionTitle}>
          {language === "es" ? "1. ARTÍCULOS DE ALQUILER" : "1. RENTAL ITEMS"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `1.1 LA EMPRESA está de acuerdo en alquilarle a EL CLIENTE los siguientes artículos para su uso en el ${formData.eventType} el ${eventDate}:`
            : `1.1 THE COMPANY agrees to rent to THE CLIENT the following items for use at ${formData.eventType} on ${eventDate}:`}
        </Text>

        {/* Rental Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableHeaderCell, { flex: 3 }]}>
              {language === "es" ? "Artículo" : "Item"}
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "center" }]}
            >
              {language === "es" ? "Precio Unitario" : "Unit Price"}
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "center" }]}
            >
              {language === "es" ? "Cantidad" : "Quantity"}
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}
            >
              {language === "es" ? "Total" : "Total"}
            </Text>
          </View>

          {/* Table Rows */}
          {formData.selectedItems.map((item, index) => {
            const originalPrice =
              parseFloat(item.price) * parseInt(item.quantity);
            const discount = item.discount
              ? originalPrice * (item.discount / 100)
              : 0;
            const finalPrice = originalPrice - discount;

            return (
              <View key={index}>
                <View
                  style={[
                    styles.tableRow,
                    { borderBottomWidth: item.description ? 0 : 1 },
                  ]}
                >
                  <Text style={[styles.tableCell, { flex: 3 }]}>
                    {item.rentalItem}
                    {item.discount > 0 && ` (-${item.discount}%)`}
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
                    ${finalPrice.toFixed(2)}
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
            );
          })}

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
              {language === "es" ? "Subtotal:" : "Subtotal:"}
            </Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, textAlign: "right", fontWeight: "bold" },
              ]}
            >
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.totalRow, { borderTopWidth: 0 }]}>
            <Text style={[styles.tableCell, { flex: 3 }]}></Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, textAlign: "right", fontWeight: "bold" },
              ]}
            >
              {language === "es" ? "ITBIS (18%):" : "ITBIS (18%):"}
            </Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, textAlign: "right", fontWeight: "bold" },
              ]}
            >
              ${taxAmount.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.totalRow, { borderTopWidth: 2 }]}>
            <Text style={[styles.tableCell, { flex: 3 }]}></Text>
            <Text style={[styles.tableCell, { flex: 1 }]}></Text>
            <Text
              style={[
                styles.tableCell,
                { flex: 1, textAlign: "right", fontWeight: "bold" },
              ]}
            >
              {language === "es" ? "TOTAL:" : "TOTAL:"}
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
        <View style={[styles.table, { marginTop: 20 }]}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>
              {language === "es" ? "Resumen de Pagos" : "Payment Summary"}
            </Text>
            <Text
              style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}
            >
              {language === "es" ? "Monto" : "Amount"}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {language === "es"
                ? `Depósito ${formData.depositPercentage ? `(${formData.depositPercentage}%)` : "(60%)"}`
                : `Deposit ${formData.depositPercentage ? `(${formData.depositPercentage}%)` : "(60%)"}`}
            </Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
              ${depositAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {language === "es" ? "Saldo Restante" : "Remaining Balance"}
            </Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>
              ${balanceDue.toFixed(2)}
            </Text>
          </View>
        </View>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `1.2 Los artículos de alquiler se entregarán y recogerán de ${formData.eventLocation}.`
            : `1.2 The rental items will be delivered to and picked up from ${formData.eventLocation}.`}
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>
          {language === "es" ? "2. PERÍODO DE ALQUILER" : "2. RENTAL PERIOD"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.1 El período de alquiler comienza el ${eventDate} a las ${formData.eventStartTime} y termina el ${eventDate} a las ${formData.eventEndTime}.`
            : `2.1 The rental period begins on ${eventDate} at ${formData.eventStartTime} and ends on ${eventDate} at ${formData.eventEndTime}.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.2 Las extensiones del período de alquiler deben ser acordadas por escrito y pueden incurrir en cargos adicionales.`
            : `2.2 Extensions of the rental period must be agreed upon in writing and may incur additional charges.`}
        </Text>

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "3. TÉRMINOS DE PAGO Y PRECIOS"
            : "3. PRICE AND PAYMENT TERMS"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `3.1 El monto total del alquiler es de $${totalAmount.toFixed(2)}, que incluye todos los artículos enumerados en la Sección 1 y los impuestos aplicables.`
            : `3.1 The total rental fee is ${totalAmount.toFixed(2)}, which includes all items listed in Section 1 and applicable taxes.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `3.2 EL CLIENTE está de acuerdo en hacer un depósito de $${depositAmount.toFixed(2)} ${formData.depositPercentage ? `(${formData.depositPercentage}% del monto total del alquiler)` : ""} al firmar este Acuerdo.`
            : `3.2 THE CLIENT agrees to make a deposit of $${depositAmount.toFixed(2)} ${formData.depositPercentage ? `(${formData.depositPercentage}% of the total rental fee)` : ""} upon signing this Agreement.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `3.3 El saldo restante de $${balanceDue.toFixed(2)} debe pagarse antes de que comience el período de alquiler.`
            : `3.3 The remaining balance of $${balanceDue.toFixed(2)} must be paid no later than 3 days before the rental period begins.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `3.4 Todos los pagos son no reembolsables excepto como se establece en este Acuerdo.`
            : `3.4 All payments are non-refundable except as otherwise provided in this Agreement.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "*Pagando en efectivo? Disfrute de un **descuento del 18%** aplicado al total. Esta oferta es válida solo para pagos en efectivo."
            : "*Paying in cash? Enjoy a **18% discount** applied to the total. Offer valid only for full cash payments."}
        </Text>

        {/* Section 4 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "4. ENTREGA, MONTAJE Y RECUPERACIÓN"
            : "4. DELIVERY, SETUP, AND PICKUP"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `4.1 LA EMPRESA entregará los artículos de alquiler a ${formData.eventLocation} el ${eventDate} a una hora acordada por ambas partes.`
            : `4.1 THE COMPANY will deliver the rental items to ${formData.eventLocation} on ${eventDate} at a time to be agreed upon by both parties.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `4.2 Los servicios de montaje y desmontaje son ${formData.setupIncluded ? "incluidos en" : "no incluidos en"} el monto del alquiler.`
            : `4.2 Setup and teardown services are ${formData.setupIncluded ? "included in" : "not included in"} the rental fee.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `4.3 LA EMPRESA recogerá los artículos de alquiler de la misma ubicación el ${eventDate} a las ${formData.eventEndTime} o a una hora acordada por ambas partes.`
            : `4.3 THE COMPANY will pick up the rental items from the same location on ${eventDate} at ${formData.eventEndTime} or at a time agreed upon by both parties.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `4.4 EL CLIENTE debe asegurarse de que todos los artículos de alquiler estén accesibles para la recogida en la hora acordada.`
            : `4.4 THE CLIENT must ensure that all rental items are accessible for pickup at the agreed time.`}
        </Text>

        {/* Section 5 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "5. RESPONSABILIDADES DEL CLIENTE"
            : "5. CLIENT RESPONSIBILITIES"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `5.1 EL CLIENTE está de acuerdo en:`
            : `5.1 THE CLIENT agrees to:`}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "a) Usar todos los artículos de alquiler para su propósito previsto y de manera segura"
            : "a) Use all rental items for their intended purpose and in a safe manner"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "b) No alterar, modificar o reparar cualquier artículo de alquiler sin permiso por escrito"
            : "b) Not alter, modify, or repair any rental items without written permission"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "c) Supervisar y controlar el uso de los artículos de alquiler"
            : "c) Supervise and control the use of rental items"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "d) Devolver todos los artículos en la misma condición recibida, excepto el desgaste ordinario y la rotura"
            : "d) Return all items in the same condition as received, ordinary wear and tear excepted"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "e) Ser responsable de cualquier daño, pérdida o robo de artículos de alquiler durante el período de alquiler"
            : "e) Be responsible for any damage, loss, or theft of rental items during the rental period"}
        </Text>
      </Page>

      {/* Third Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 6 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "6. DAÑOS Y REPOSICIÓN"
            : "6. DAMAGES AND REPLACEMENT"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `6.1 EL CLIENTE se hará cargo de cualquier artículo que se dañe, se pierda o se robe.`
            : `6.1 THE CLIENT will be charged for any items that are damaged, lost, stolen, or not returned.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `6.2 Los cargos por daños o artículos perdidos se basarán en el costo de reemplazo.`
            : `6.2 Charges for damaged or missing items will be based on replacement cost.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `6.3 EL CLIENTE está de acuerdo en pagar la diferencia dentro de 7 días después de ser notificado.`
            : `6.3 THE CLIENT agrees to pay the difference within 7 days of being notified.`}
        </Text>

        {/* Section 7 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "7. CANCELACIÓN Y REPROGRAMACIÓN"
            : "7. CANCELLATION AND RESCHEDULING"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `7.1 Cancelación por EL CLIENTE:`
            : `7.1 Cancellation by THE CLIENT:`}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "a) Más de 30 días antes del evento: se reembolsará el 70% del depósito"
            : "a) More than 30 days before the event: 70% of the deposit will be refunded"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "b) 15-30 días antes del evento: se reembolsará el 50% del depósito"
            : "b) 15-30 days before the event: 50% of the deposit will be refunded"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "c) 7-14 días antes del evento: se reembolsará el 25% del depósito"
            : "c) 7-14 days before the event: 25% of the deposit will be refunded"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "d) Menos de 7 días antes del evento: no se reembolsará"
            : "d) Less than 7 days before the event: No refund will be issued"}
        </Text>

        <Text style={styles.paragraph}>
          {language === "es"
            ? `7.2 En caso de condiciones climáticas adversas o circunstancias más allá del control de LA EMPRESA, el alquiler puede reprogramarse a una fecha alternativa mutuamente acordada por ambas partes, sujeto a disponibilidad.`
            : `7.2 In case of adverse weather conditions or circumstances beyond THE COMPANY's control, the rental may be rescheduled to an alternative date mutually agreed upon by both parties, subject to availability.`}
        </Text>

        {/* Section 8 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "8. RESPONSABILIDAD Y EXONERACIÓN"
            : "8. LIABILITY AND INDEMNIFICATION"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `8.1 LA EMPRESA deberá mantener una cobertura de seguros por responsabilidad civil para los artículos de alquiler.`
            : `8.1 THE COMPANY shall maintain liability insurance for the rental items.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `8.2 EL CLIENTE está de acuerdo en exonerar y liberar a LA EMPRESA de cualquier reclamo, pérdida, daño, responsabilidad, costos o gastos que surjan de la utilización de los artículos de alquiler o incumplimiento de este Acuerdo.`
            : `8.2 THE CLIENT agrees to indemnify and hold THE COMPANY harmless from any claims, losses, damages, liabilities, costs or expenses arising from THE CLIENT's use of the rental items or breach of this Agreement.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `8.3 LA EMPRESA no es responsable de cualquier lesión o daño causado por la utilización de los artículos de alquiler.`
            : `8.3 THE COMPANY is not responsible for any injury or damage caused by the use of rental items.`}
        </Text>

        {/* Section 9 */}
        <Text style={styles.sectionTitle}>
          {language === "es" ? "9. FUERZA MAYOR" : "9. FORCE MAJEURE"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `Ninguna de las partes será responsable de incumplimiento de este Acuerdo debido a circunstancias más allá de su control razonable, incluyendo pero no limitado a actos de Dios, desastres naturales, restricciones gubernamentales u otras catástrofes imprevistas.`
            : `Neither party shall be liable for failure to perform under this Agreement due to circumstances beyond their reasonable control, including but not limited to acts of God, natural disasters, governmental restrictions, or other unforeseen catastrophes.`}
        </Text>
      </Page>

      {/* Fourth Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 10 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "10. LEY Y RESOLUCIÓN DE DISPUTAS"
            : "10. GOVERNING LAW AND DISPUTE RESOLUTION"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `10.1 Este Acuerdo se regirá por las leyes de la República Dominicana.`
            : `10.1 This Agreement shall be governed by the laws of the Dominican Republic.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `10.2 Cualquier disputa que surja de o esté relacionada con este Acuerdo se intentará resolver primero a través de la negociación. Si la negociación falla, la disputa se someterá a mediación y, si es necesario, arbitraje a través del Centro de Resolución Alternativa de Controversias (CRC) de la Cámara de Comercio y Producción de Santo Domingo de acuerdo con sus reglas y procedimientos.`
            : `10.2 Any disputes arising out of or in connection with this Agreement shall first be attempted to be resolved through negotiation. If negotiation fails, the dispute shall be submitted to mediation and, if necessary, arbitration through the Centro de Resolución Alternativa de Controversias (CRC) of the Chamber of Commerce and Production of Santo Domingo in accordance with its rules and procedures.`}
        </Text>
        Trans
        {/* Section 11 */}
        <Text style={styles.sectionTitle}>
          {language === "es" ? "11. ACUERDO COMPLETO" : "11. ENTIRE AGREEMENT"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `Este Acuerdo constituye la comprensión total entre las partes y anula todas las negociaciones, entendimientos y acuerdos previos, ya sean verbales o escritos.`
            : `This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations, understandings, and agreements, whether oral or written.`}
        </Text>
        {/* Section 12 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "12. ACEPTACIÓN DE LAS PARTES"
            : "12. ACCEPTANCE OF THE PARTIES"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `Como señal de acuerdo y aceptación de las condiciones establecidas en este contrato, ambas partes lo firman en dos copias en la fecha de su ejecución.`
            : `As a sign of agreement and acceptance of the conditions established herein, both parties sign this contract in two copies on the date of its execution.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `En Santo Domingo, República Dominicana, el ${currentDate}.`
            : `IN Santo Domingo, Dominican Republic, ${currentDate}.`}
        </Text>
        <Text style={[styles.paragraph, { fontSize: 10, fontStyle: "italic" }]}>
          {language === "es"
            ? "*El descuento del 18% aplica solo para pagos en efectivo."
            : "*The 18% discount applies only to full cash payments."}
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

const RentalPDFContractGenerator = ({ formData, companyInfo }) => {
  const { language } = useI18next();

  const sendQuoteEmail = async () => {
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
            ? "Contrato enviado exitosamente al cliente!"
            : "Contract sent successfully to the client!",
        );
      }
    } catch (error) {
      console.error("Error sending contract email:", error);
      alert(
        language === "es"
          ? "Error al enviar el contrato. Por favor, inténtelo de nuevo."
          : "Failed to send contract. Please try again.",
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
    const prefix = language === "es" ? "Alquiler" : "Rental";
    const date = format(new Date(), "yyyy-MM-dd");
    return `Sertuin_Events_${prefix}_${formData.clientName.replace(/\s+/g, "_")}_${date}.pdf`;
  };

  return (
    <div className="flex flex-col space-y-4 items-center mt-6">
      <PDFDownloadLink
        document={
          <ContractPDF
            formData={formData}
            companyInfo={companyInfo}
            language={language}
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
      <button
        onClick={sendQuoteEmail}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        <Trans>Email Quote to Client</Trans>
      </button>
    </div>
  );
};

export default RentalPDFContractGenerator;
