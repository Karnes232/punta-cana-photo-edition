import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  pdf,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
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
    marginTop: 10,
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
  signature: {
    marginTop: 10,
    width: 150,
    height: 90,
  },
  signatureLineClient: {
    borderTopWidth: 1,
    borderColor: "#000",
    marginTop: 110,
    marginBottom: 5,
  },
  stamp: {
    position: "absolute",
    bottom: 40, // Adjust as needed
    right: 40, //
    width: 150,
    height: 150,
  },
});

const ContractPDF = ({ formData, companyInfo, language }) => {
  const currentDate = format(new Date(), "MMMM d, yyyy");
  const subtotal = (
    parseFloat(formData.packagePrice) +
    formData.additions.reduce(
      (sum, addition) => sum + parseFloat(addition.price || 0),
      0,
    )
  ).toFixed(2);

  const taxRate = 0.18; // 18% ITBIS
  const taxAmount = (parseFloat(subtotal) * taxRate).toFixed(2);
  const totalPrice = (parseFloat(subtotal) + parseFloat(taxAmount)).toFixed(2);

  const downPayment = formData.deposit
    ? parseFloat(formData.deposit).toFixed(2)
    : (
        totalPrice *
        (formData.depositPercentage ? formData.depositPercentage / 100 : 0.6)
      ).toFixed(2);
  const remainingBalance = (totalPrice - downPayment).toFixed(2);
  const eventLocation = formData.eventLocation;
  const eventDate = formData.eventDate
    ? format(new Date(formData.eventDate), "MMMM d, yyyy")
    : "[DATE]";
  const eventStartTime = formData.eventStartTime;
  const eventEndTime = formData.eventEndTime;
  const companyStamp = companyInfo.companyStamp.url;
  const signature = companyInfo.signature.url;

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          {language === "es"
            ? "ACUERDO DE SERVICIOS PARA PLANIFICACIÓN DE EVENTOS"
            : "SERVICE AGREEMENT FOR EVENT PLANNING"}
        </Text>

        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>
                Este Acuerdo de Servicios
              </Text>
              {` (el "Acuerdo") se celebra el ${currentDate}`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>This Service Agreement</Text>
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
              <Text style={{ fontWeight: "bold" }}>Between</Text>
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
              <Text style={{ fontWeight: "bold" }}>CONSIDERANDO QUE</Text>
              {` EL CLIENTE desea contratar a LA EMPRESA para proporcionar ciertos servicios de planificación de eventos;`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>WHEREAS</Text>
              {` THE CLIENT wishes to engage THE COMPANY to provide certain event planning services;`}
            </React.Fragment>
          )}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>Y CONSIDERANDO QUE</Text>
              {` LA EMPRESA acepta proporcionar dichos servicios de acuerdo con los términos y condiciones establecidos en este Acuerdo;`}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>AND WHEREAS</Text>
              {` THE COMPANY agrees to provide such services in accordance with the terms and conditions set forth in this Agreement;`}
            </React.Fragment>
          )}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es" ? (
            <React.Fragment>
              <Text style={{ fontWeight: "bold" }}>
                POR LO TANTO, SE HA ACORDADO Y ESTIPULADO LO SIGUIENTE:
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
          {language === "es"
            ? "1. OBJETO DEL ACUERDO"
            : "1. PURPOSE OF THE AGREEMENT"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `1.1 LA EMPRESA se compromete a proporcionar a EL CLIENTE los servicios de planificación de eventos para ${formData.eventType} bajo el paquete "${formData.package}", que incluye:`
            : `1.1 THE COMPANY agrees to provide THE CLIENT with the event planning services for ${formData.eventType} under the "${formData.package}" package, which includes:`}
        </Text>
        <Text style={styles.paragraph}>{formData.packagesDescription}</Text>

        <Text style={styles.paragraph}>
          {language === "es"
            ? "1.2 Elementos Adicionales Solicitados por el Cliente:"
            : "1.2 Additional Items Requested by the Client:"}
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
            <Text style={[styles.tableCell, { flex: 3 }]}>
              {language === "es" ? "Artículo" : "Item"}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {language === "es" ? "Precio (USD)" : "Price (USD)"}
            </Text>
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
                {language === "es"
                  ? "No se seleccionaron elementos adicionales"
                  : "No additional items selected"}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.paragraph}>
          {language === "es"
            ? "1.3 El servicio se proporcionará en la fecha y hora acordadas por ambas partes, en el lugar especificado en la Sección 3 de este Acuerdo."
            : " 1.3 The service will be provided on the date and time agreed upon by both parties, at the location specified in Section 3 of this Agreement."}
        </Text>
      </Page>

      {/* Second Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 2 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "2. PRECIO Y TÉRMINOS DE PAGO"
            : "2. PRICE AND PAYMENT TERMS"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.1 El subtotal del paquete "${formData.package}" incluyendo todos los elementos adicionales es $${subtotal}.`
            : `2.1 The subtotal for the "${formData.package}" package including all additional items is $${subtotal}.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.2 El ITBIS (18%) aplicable es $${taxAmount}.`
            : `2.2 The applicable ITBIS (18%) is $${taxAmount}.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.3 El precio total incluyendo ITBIS es $${totalPrice}.`
            : `2.3 The total price including ITBIS is $${totalPrice}.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.4 EL CLIENTE acepta realizar un pago inicial (anticipo) del ${formData.depositPercentage || 60}% del precio total, equivalente a $${downPayment}, al firmar este Acuerdo.`
            : `2.4 THE CLIENT agrees to make an initial payment (down payment) of ${formData.depositPercentage || 60}% of the total price, equivalent to $${downPayment}, upon signing this Agreement.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.5 El saldo restante de $${remainingBalance} debe pagarse según los términos establecidos específicamente para este evento.`
            : `2.5 The remaining balance of $${remainingBalance} must be paid according to the specific terms established for this event.`}
        </Text>
        {formData.paymentTerms && (
          <Text style={styles.paragraph}>2.6 {formData.paymentTerms}</Text>
        )}
        <Text style={styles.paragraph}>
          {language === "es"
            ? `2.7 Si EL CLIENTE decide pagar el saldo restante mediante PayPal u otro método de pago electrónico, deberá pagar un 10% adicional por concepto de transacción, además del 18% de ITBIS. Si el pago se realiza en efectivo, se aplicará un descuento equivalente al 18% de ITBIS y al 10% de transacción.`
            : `2.7 If THE CLIENT chooses to pay the remaining balance via PayPal or another digital payment method, an additional 10% transaction fee will apply, in addition to the 18% ITBIS. If payment is made in cash, a discount equivalent to the 18% ITBIS and the 10% transaction fee will be applied.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "2.8 Todos los pagos no son reembolsables excepto según lo dispuesto en este Acuerdo."
            : "2.8 All payments are non-refundable except as otherwise provided in this Agreement."}
        </Text>

        <Text style={styles.paragraph}>
          {language === "es"
            ? "*Pagando en efectivo? Disfrute de un **descuento del 18%** aplicado al total. Esta oferta es válida solo para pagos en efectivo."
            : "*Paying in cash? Enjoy a **18% discount** applied to the total. Offer valid only for cash payments."}
        </Text>

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "3. UBICACIÓN Y DETALLES DEL SERVICIO"
            : "3. LOCATION AND SERVICE DETAILS"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `3.1 El evento tendrá lugar en ${eventLocation}, el ${eventDate} de ${eventStartTime} a ${eventEndTime}.`
            : `3.1 The event will take place at ${eventLocation}, on ${eventDate} from ${eventStartTime} to ${eventEndTime}.`}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "3.2 EL CLIENTE y sus invitados deben cumplir con todas las políticas y regulaciones del lugar."
            : "3.2 THE CLIENT and their guests must comply with all venue policies and regulations."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "3.3 LA EMPRESA proporcionará el transporte necesario para el equipo y el personal del evento."
            : "3.3 THE COMPANY will provide transportation for equipment and staff as necessary for the event."}
        </Text>
      </Page>

      {/* Third Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 4 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "4. RESPONSABILIDADES Y CONDICIONES"
            : "4. RESPONSIBILITIES AND CONDITIONS"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "4.1 Responsabilidades de LA EMPRESA:"
            : "4.1 THE COMPANY's Responsibilities:"}
        </Text>
        <Text style={styles.listItem}>
          a){" "}
          {language === "es"
            ? "Proporcionar todos los servicios descritos en la Sección 1 con cuidado y habilidad profesional"
            : "To provide all services described in Section 1 with professional care and skill"}
        </Text>
        <Text style={styles.listItem}>
          b){" "}
          {language === "es"
            ? "Coordinar con vendedores y proveedores según sea necesario"
            : "To coordinate with vendors and suppliers as necessary"}
        </Text>
        <Text style={styles.listItem}>
          c){" "}
          {language === "es"
            ? "Realizar la instalación y desmontaje oportuno de los elementos del evento"
            : "To perform timely setup and breakdown of event elements"}
        </Text>
        <Text style={styles.listItem}>
          d){" "}
          {language === "es"
            ? "Mantener una cobertura de seguro apropiada para el evento"
            : "To maintain appropriate insurance coverage for the event"}
        </Text>
        <Text style={styles.listItem}>
          e){" "}
          {language === "es"
            ? "Atender cualquier preocupación razonable planteada por EL CLIENTE durante el proceso de planificación"
            : "To address any reasonable concerns raised by THE CLIENT during the planning process"}
        </Text>
        <Text style={[{ marginTop: 10 }]}></Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "4.2 Responsabilidades del CLIENTE:"
            : "4.2 THE CLIENT's Responsibilities:"}
        </Text>
        <Text style={styles.listItem}>
          a){" "}
          {language === "es"
            ? "Proporcionar información precisa relacionada con el evento"
            : "To provide accurate information related to the event"}
        </Text>
        <Text style={styles.listItem}>
          b){" "}
          {language === "es"
            ? "Realizar pagos de acuerdo con la programación establecida en la Sección 2"
            : "To make payments according to the schedule outlined in Section 2"}
        </Text>
        <Text style={styles.listItem}>
          c){" "}
          {language === "es"
            ? "Notificar a LA EMPRESA de cualquier cambio con al menos 30 días de anticipación"
            : "To notify THE COMPANY of any changes at least 30 days in advance"}
        </Text>
        <Text style={styles.listItem}>
          d){" "}
          {language === "es"
            ? "Obtener cualquier permiso o autorización necesaria no incluida expresamente en este Acuerdo"
            : "To obtain any necessary permits or permissions not expressly included in this Agreement"}
        </Text>
        <Text style={styles.listItem}>
          e){" "}
          {language === "es"
            ? "Asegurar que los invitados se comporten adecuadamente durante el evento"
            : "To ensure guests conduct themselves appropriately during the event"}
        </Text>

        {/* Section 5 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "5. CAMBIOS Y MODIFICACIONES"
            : "5. CHANGES AND MODIFICATIONS"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "5.1 Cualquier cambio en los servicios, fecha, hora o ubicación debe solicitarse por escrito al menos 30 días antes de la fecha del evento."
            : "5.1 Any changes to the services, date, time, or location must be requested in writing at least 30 days before the event date."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "5.2 LA EMPRESA hará esfuerzos razonables para acomodar los cambios solicitados, pero no puede garantizar la disponibilidad."
            : "5.2 THE COMPANY will make reasonable efforts to accommodate requested changes but cannot guarantee availability."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "5.3 Los servicios adicionales solicitados después de firmar este Acuerdo estarán sujetos a cargos adicionales según lo determine LA EMPRESA."
            : "5.3 Additional services requested after signing this Agreement will be subject to additional fees as determined by THE COMPANY."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "5.4 Los cambios solicitados con menos de 30 días de anticipación pueden no ser acomodados y/o pueden incurrir en cargos adicionales sustanciales."
            : "5.4 Changes requested with less than 30 days' notice may not be accommodated and/or may incur substantial additional charges."}
        </Text>

        {/* Section 6 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "6. CANCELACIÓN Y REPROGRAMACIÓN"
            : "6. CANCELLATION AND RESCHEDULING"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "6.1 Cancelación por parte de EL CLIENTE:"
            : "6.1 Cancellation by THE CLIENT:"}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "a) En caso de cancelación por parte de EL CLIENTE por cualquier razón, el anticipo no es reembolsable."
            : "a) In case of cancellation by THE CLIENT for any reason, the down payment is non-refundable."}
        </Text>
        <Text style={styles.listItem}>
          {language === "es"
            ? "b) Si se cancela menos de 7 días antes del evento: Se debe pagar el monto total del contrato y no es reembolsable."
            : "b) If cancelled less than 7 days before the event: The full contract amount is due and non-refundable."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "6.2 En caso de condiciones climáticas adversas o circunstancias más allá del control de LA EMPRESA, el evento puede reprogramarse a una fecha alternativa mutuamente acordada por ambas partes, sujeto a la disponibilidad."
            : "6.2 In case of adverse weather conditions or circumstances beyond THE COMPANY's control, the event may be rescheduled to an alternative date mutually agreed upon by both parties, subject to availability."}
        </Text>
      </Page>

      {/* Fourth Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 7 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "7. RESPONSABILIDAD E INDEMNIZACIÓN"
            : "7. LIABILITY AND INDEMNIFICATION"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "7.1 LA EMPRESA deberá mantener una cobertura de seguro para el evento."
            : "7.1 THE COMPANY shall maintain liability insurance for the event."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "7.2 EL CLIENTE acepta indemnizar y liberar a LA EMPRESA de cualquier reclamo, pérdida, daño, responsabilidad, costos o gastos que surjan de la violación de este Acuerdo o las acciones negligentes de EL CLIENTE o sus invitados."
            : "7.2 THE CLIENT agrees to indemnify and hold THE COMPANY harmless from any claims, losses, damages, liabilities, costs or expenses arising from THE CLIENT's breach of this Agreement or the negligent acts of THE CLIENT or their guests."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "7.3 La responsabilidad total de LA EMPRESA bajo este Acuerdo no excederá el monto total pagado por EL CLIENTE."
            : "7.3 THE COMPANY's total liability under this Agreement shall not exceed the total amount paid by THE CLIENT."}
        </Text>

        {/* Section 8 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "8. PROPIEDAD INTELECTUAL"
            : "8. INTELLECTUAL PROPERTY"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "8.1 LA EMPRESA tiene derecho a usar fotografías y videos tomados durante el evento para promocionar sus servicios a menos que se acuerde lo contrario por escrito."
            : "8.1 THE COMPANY reserves the right to use photographs and videos taken during the event for promotional purposes unless otherwise agreed in writing."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "8.2 EL CLIENTE otorga a LA EMPRESA permiso para usar su imagen en tales materiales promocionales a menos que se especifique lo contrario por escrito."
            : "8.2 THE CLIENT grants THE COMPANY permission to use their likeness in such promotional materials unless specifically prohibited in writing."}
        </Text>

        {/* Section 9 */}
        <Text style={styles.sectionTitle}>
          {language === "es" ? "9. FUERZA MAYOR" : "9. FORCE MAJEURE"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "Ninguna parte será responsable por el incumplimiento de este Acuerdo debido a circunstancias más allá del control razonable de ambas partes, incluyendo pero no limitado a actos de Dios, desastres naturales, restricciones gubernamentales u otras catástrofes imprevistas."
            : "Neither party shall be liable for failure to perform under this Agreement due to circumstances beyond their reasonable control, including but not limited to acts of God, natural disasters, governmental restrictions, or other unforeseen catastrophes."}
        </Text>

        {/* Section 10 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "10. LEY APLICABLE Y RESOLUCIÓN DE DISPUTAS"
            : "10. GOVERNING LAW AND DISPUTE RESOLUTION"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "10.1 Este Acuerdo se regirá por las leyes de la República Dominicana."
            : "10.1 This Agreement shall be governed by the laws of the Dominican Republic."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "10.2 Cualquier disputa que surja de o esté relacionada con este Acuerdo se intentará resolver primero a través de la negociación. Si la negociación falla, la disputa se someterá a mediación y, si es necesario, arbitraje a través del Centro de Resolución Alternativa de Controversias (CRC) de la Cámara de Comercio y Producción de Santo Domingo de acuerdo con sus reglas y procedimientos."
            : "10.2 Any disputes arising out of or in connection with this Agreement shall first be attempted to be resolved through negotiation. If negotiation fails, the dispute shall be submitted to mediation and, if necessary, arbitration through the Centro de Resolución Alternativa de Controversias (CRC) of the Chamber of Commerce and Production of Santo Domingo in accordance with its rules and procedures."}
        </Text>

        {/* Section 11 */}
        <Text style={styles.sectionTitle}>
          {language === "es" ? "11. ACUERDO COMPLETO" : "11. ENTIRE AGREEMENT"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "Este Acuerdo constituye la comprensión completa entre las partes y supera todas las negociaciones, entendimientos y acuerdos previos, ya sean verbales o escritos."
            : "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations, understandings, and agreements, whether oral or written."}
        </Text>
      </Page>

      {/* Fourth Page */}
      <Page size="A4" style={styles.page}>
        {/* Section 12 */}
        <Text style={styles.sectionTitle}>
          {language === "es"
            ? "12. ACEPTACIÓN DE LAS PARTES"
            : "12. ACCEPTANCE OF THE PARTIES"}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? "Como señal de acuerdo y aceptación de las condiciones establecidas en el presente documento, ambas partes firman este contrato en dos ejemplares en la fecha de su ejecución."
            : "As a sign of agreement and acceptance of the conditions established herein, both parties sign this contract in two copies on the date of its execution."}
        </Text>
        <Text style={styles.paragraph}>
          {language === "es"
            ? `En Santo Domingo, República Dominicana, ${currentDate}.`
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
            <Text>
              {language === "es" ? "Representante" : "Representative"}
            </Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text>{language === "es" ? "CLIENTE" : "CLIENT"}</Text>
            <View style={styles.signatureLineClient} />
            <Text>{formData.clientName}</Text>
          </View>
        </View>
        <Image src={companyStamp} style={styles.stamp} />
      </Page>
    </Document>
  );
};

const PDFContractGenerator = ({ formData, companyInfo }) => {
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
    const prefix = language === "es" ? "Contrato" : "Contract";
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

export default PDFContractGenerator;
