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
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
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
  packageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  packageDetails: {
    marginBottom: 20,
  },
  packageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 12,
  },
  packageDescription: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#000",
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
});

// Create Document Component
const QuotePDF = ({ formData }) => {
  const logoUrl =
    "https://images.ctfassets.net/vpskymlp6aa0/pKzEbbiqIVQrzq8SeaxPy/8fe23dd9429e712b8c681cb2d287056b/logotipo_sertuin_events.png";
  const date = new Date().toLocaleDateString();
  const quoteNumber = `Q${Date.now().toString().slice(-6)}`;

  // Calculate total (could be expanded for additions)
  const total = parseFloat(formData.packagePrice);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logoUrl} style={styles.logo} />
          <View>
            <Text>Quote #: {quoteNumber}</Text>
            <Text>Date: {date}</Text>
          </View>
        </View>

        <Text style={styles.quoteTitle}>EVENT PACKAGE QUOTE</Text>

        <View style={styles.clientInfo}>
          <Text style={styles.clientInfoTitle}>Client Information:</Text>
          <Text style={styles.clientDetail}>Name: {formData.name}</Text>
          <Text style={styles.clientDetail}>Email: {formData.email}</Text>
        </View>

        <View style={styles.packageDetails}>
          <Text style={styles.packageTitle}>Package Details:</Text>
          <View style={styles.packageItem}>
            <Text>Package: {formData.package}</Text>
            <Text>${parseFloat(formData.packagePrice).toFixed(2)}</Text>
          </View>

          {formData.packagesDescription && (
            <Text style={styles.packageDescription}>
              Description: {formData.packagesDescription}
            </Text>
          )}

          {/* Additions could be mapped here if implemented */}
        </View>

        <View style={styles.total}>
          <Text>Total:</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>

        <View style={styles.footer}>
          <Text>Sertuin Events • Thank you for your business!</Text>
          <Text>This quote is valid for 30 days from the date of issue.</Text>
        </View>
      </Page>
    </Document>
  );
};

const PDFQuoteGenerator = ({ formData }) => {
  const { t } = useTranslation();

  const sendQuoteEmail = async () => {
    try {
      const pdfDoc = <QuotePDF formData={formData} />;

      // Debug log to check PDF content
      console.log("PDF Content:", formData);

      const pdfBlob = await pdf(pdfDoc).toBlob();

      // Check if the PDF has content
      if (pdfBlob.size === 0) {
        throw new Error("Generated PDF is empty");
      }

      // Convert Blob to Base64 with proper encoding
      const pdfBase64 = await blobToBase64(pdfBlob);

      // Send the email with the PDF
      const response = await axios.post("/.netlify/functions/sendQuoteEmail", {
        name: formData.name,
        email: formData.email,
        pdf: pdfBase64,
      });

      if (response.status === 200) {
        alert(t("Quote sent successfully to the client!"));
      }
    } catch (error) {
      console.error("Error sending quote email:", error);
      alert(t("Failed to send quote. Please try again."));
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

  return (
    <div className="flex flex-col space-y-4 items-center mt-6">
      <PDFDownloadLink
        document={<QuotePDF formData={formData} />}
        fileName={`Sertuin_Events_Quote_${formData.name.replace(/\s+/g, "_")}.pdf`}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        {({ blob, url, loading, error }) =>
          loading ? t("Generating Quote...") : t("Download Quote PDF")
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

export default PDFQuoteGenerator;
