import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  quoteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  clientInfo: {
    marginBottom: 20,
  },
  clientInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clientDetail: {
    fontSize: 12,
    marginBottom: 5,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemsDetails: {
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 12,
  },
  notes: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  subtotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#000",
    fontSize: 12,
  },
  tax: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    fontSize: 12,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
  companyInfo: {
    marginLeft: "auto",
    fontSize: 10,
    textAlign: "right",
    maxWidth: "50%",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  companyDetail: {
    marginBottom: 1,
    lineHeight: 1,
  },
  paymentTerms: {
    marginBottom: 15,
    fontSize: 10,
    color: "#333",
    textAlign: "center",
    maxWidth: "75%",
  },
  paymentTermsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});

const RentalQuotePDF = ({ formData, companyInfo, language }) => {
  const logoUrl =
    "https://images.ctfassets.net/vpskymlp6aa0/pKzEbbiqIVQrzq8SeaxPy/8fe23dd9429e712b8c681cb2d287056b/logotipo_sertuin_events.png";

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    locale: language,
  };
  const date = new Date().toLocaleDateString(language, dateOptions);
  const quoteNumber = `${language === "es" ? "CR" : "RQ"}${Date.now().toString().slice(-6)}`;

  // Calculate subtotal, tax (ITBIS), and total
  const subtotal = formData.selectedItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );
  const taxRate = 0.18; // 18% ITBIS
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logoUrl} style={styles.logo} />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Sertuin Events</Text>
            <Text style={styles.companyDetail}>
              {language === "es" ? "Tel" : "Tel"}: {companyInfo.telephone}
            </Text>
            <Text style={styles.companyDetail}>
              {language === "es" ? "Correo" : "Email"}: {companyInfo.email}
            </Text>
            <Text style={styles.companyDetail}>RNC: {companyInfo.rnc}</Text>
            <Text style={styles.companyDetail}>{companyInfo.address}</Text>
            <Text style={styles.companyDetail}>
              {language === "es" ? "Cotización" : "Quote"} #: {quoteNumber}
            </Text>
            <Text style={styles.companyDetail}>
              {language === "es" ? "Fecha" : "Date"}: {date}
            </Text>
          </View>
        </View>

        <Text style={styles.quoteTitle}>
          {language === "es" ? "COTIZACIÓN DE ALQUILER" : "RENTAL QUOTE"}
        </Text>

        <View style={styles.clientInfo}>
          <Text style={styles.clientInfoTitle}>
            {language === "es"
              ? "Información del Cliente:"
              : "Client Information:"}
          </Text>
          <Text style={styles.clientDetail}>
            {language === "es" ? "Nombre" : "Name"}: {formData.name}
          </Text>
          <Text style={styles.clientDetail}>
            {language === "es" ? "Teléfono" : "Telephone"}: {formData.telephone}
          </Text>
          <Text style={styles.clientDetail}>
            {language === "es" ? "Email" : "Email"}: {formData.email}
          </Text>
        </View>

        <View style={styles.itemsDetails}>
          <Text style={styles.itemsTitle}>
            {language === "es" ? "Artículos Seleccionados" : "Selected Items"}:
          </Text>
          {formData.selectedItems.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text>
                {item.rentalItem} ({item.quantity}{" "}
                {language === "es" ? "unidades" : "units"} x $
                {parseFloat(item.price).toFixed(2)})
              </Text>
              <Text>
                ${(parseFloat(item.price) * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          {formData.itemsDescription && (
            <Text style={styles.notes}>
              {language === "es" ? "Notas Adicionales" : "Additional Notes"}:{" "}
              {formData.itemsDescription}
            </Text>
          )}
        </View>

        <View style={styles.subtotal}>
          <Text>{language === "es" ? "Subtotal" : "Subtotal"}:</Text>
          <Text>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.tax}>
          <Text>{language === "es" ? "ITBIS (18%)" : "ITBIS (18%)"}:</Text>
          <Text>${taxAmount.toFixed(2)}</Text>
        </View>

        <View style={styles.total}>
          <Text>{language === "es" ? "Total" : "Total"}:</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>

        {language === "es" ? (
          <Text style={styles.paymentTerms}>
            *Si paga en efectivo, disfrute de un **18% de descuento** sobre el
            total mostrado.
          </Text>
        ) : (
          <Text style={styles.paymentTerms}>
            *Paying in cash? Enjoy a **18% discount** off the total shown.
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.paymentTermsContainer}>
            <Text style={styles.paymentTerms}>
              {language === "es"
                ? "Para confirmar esta reserva, se requiere un depósito del 60% del monto total. El 40% restante debe pagarse antes de que comience el evento."
                : "To confirm this booking, a 60% deposit of the total amount is required. The remaining 40% must be paid before the event starts."}
            </Text>
          </View>
          <View style={styles.paymentTermsContainer}>
            <Text style={styles.paymentTerms}>
              {language === "es"
                ? "*El descuento del 18% aplica solo para pagos en efectivo.."
                : "*The 18% discount applies only to full cash payments."}
            </Text>
          </View>
          <Text>
            {language === "es"
              ? "Sertuin Events • ¡Gracias por su preferencia!"
              : "Sertuin Events • Thank you for your business!"}
          </Text>
          <Text>
            {language === "es"
              ? "Esta cotización es válida por 30 días desde la fecha de emisión."
              : "This quote is valid for 30 days from the date of issue."}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const RentalPDFQuoteGenerator = ({ formData, companyInfo }) => {
  const { language } = useI18next();

  const sendQuoteEmail = async () => {
    try {
      const pdfDoc = (
        <RentalQuotePDF
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

      const response = await axios.post("/.netlify/functions/sendQuoteEmail", {
        name: formData.name,
        email: formData.email,
        pdf: pdfBase64,
        language: language,
      });

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
    const prefix = language === "es" ? "Cotizacion_Alquiler" : "Rental_Quote";
    const date = new Date().toISOString().split("T")[0];
    return `Sertuin_Events_${prefix}_${formData.name.replace(/\s+/g, "_")}_${date}.pdf`;
  };

  return (
    <div className="flex flex-col space-y-4 items-center mt-6">
      <PDFDownloadLink
        document={
          <RentalQuotePDF
            formData={formData}
            companyInfo={companyInfo}
            language={language}
          />
        }
        fileName={getFileName()}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        {({ loading }) =>
          loading
            ? language === "es"
              ? "Generando Cotización..."
              : "Generating Quote..."
            : language === "es"
              ? "Descargar Cotización PDF"
              : "Download Quote PDF"
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

export default RentalPDFQuoteGenerator;
