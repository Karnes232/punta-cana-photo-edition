import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Row,
  Column,
  Img,
  Link,
  Tailwind,
} from "@react-email/components";

export const eventRentalEmail = ({
  name = "James",
  items = [
    { name: "Chair", quantity: 1, price: 100.0 },
    { name: "Table", quantity: 1, price: 200.0 },
  ],
  companyName = "Sertuin Events",
  companyEmail = "info@sertuinevents.com",
}) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans text-gray-900 my-0 mx-0">
          <Container className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Header with Logo */}
            <Section className="bg-blue-500 px-6 py-4 text-center">
              <Img
                src="https://sertuinevents.com/_gatsby/image/7e80b5ffc02630f8b0579099aa029a11/aadda68e70952a77b95097eb6e8d4a1d/logotipo%20sertuin%20events.webp?u=https%3A%2F%2Fimages.ctfassets.net%2Fvpskymlp6aa0%2FpKzEbbiqIVQrzq8SeaxPy%2F8fe23dd9429e712b8c681cb2d287056b%2Flogotipo_sertuin_events.png&a=w%3D500%26h%3D516%26fm%3Dwebp%26q%3D75&cd=2025-02-07T22%3A34%3A29.891Z"
                alt={companyName}
                width="200"
                height="200"
                className="mx-auto"
              />
            </Section>

            {/* Main Content */}
            <Section className="px-6 py-8">
              <Heading className="text-xl font-bold text-gray-900 mt-0">
                Order Confirmation
              </Heading>

              <Text className="text-base text-gray-700 leading-6 mb-6">
                Hello {name},
              </Text>

              <Text className="text-base text-gray-700 leading-6 mb-6">
                Thank you for your rental order. We've received your request and
                are processing it now. Below is a summary of the items you've
                selected:
              </Text>

              {/* Order Summary Header */}
              <Section className="bg-gray-200 p-3 rounded-t-md">
                <Row>
                  <Column className="w-1/2">
                    <Text className="text-sm font-semibold text-gray-700 m-0">
                      Item
                    </Text>
                  </Column>
                  <Column className="w-1/4">
                    <Text className="text-sm font-semibold text-gray-700 m-0 text-center">
                      Quantity
                    </Text>
                  </Column>
                  <Column className="w-1/4">
                    <Text className="text-sm font-semibold text-gray-700 m-0 text-right">
                      Price
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* Order Items */}
              <Section className="border border-gray-200 border-t-0 rounded-b-md mb-6">
                {items.map((item, index) => (
                  <Row
                    key={index}
                    className={`p-3 ${index < items.length - 1 ? "border-b border-gray-200" : ""}`}
                  >
                    <Column className="w-1/2">
                      <Text className="text-sm text-gray-700 m-0">
                        {item.name}
                      </Text>
                    </Column>
                    <Column className="w-1/4">
                      <Text className="text-sm text-gray-700 m-0 text-center">
                        {item.quantity}
                      </Text>
                    </Column>
                    <Column className="w-1/4">
                      <Text className="text-sm text-gray-700 m-0 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </Column>
                  </Row>
                ))}
              </Section>

              {/* Totals */}
              <Section className="mb-6">
                <Hr className="border-gray-200 my-3" />

                <Row>
                  <Column className="w-3/4">
                    <Text className="text-base font-semibold text-gray-900 m-0 text-right">
                      Total:
                    </Text>
                  </Column>
                  <Column className="w-1/4">
                    <Text className="text-base font-semibold text-blue-500 m-0 text-right">
                      ${total.toFixed(2)}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-6" />

              {/* Footer */}
              <Text className="text-sm text-gray-700 leading-6">
                If you have any questions about your order, please contact our
                customer service team at{" "}
                <Link href={`mailto:${companyEmail}`} className="text-blue-500">
                  {companyEmail}
                </Link>
                .
              </Text>

              <Text className="text-sm text-gray-700 leading-6">
                Thank you for choosing {companyName}!
              </Text>
            </Section>

            {/* Email Footer */}
            <Section className="bg-gray-200 p-4 text-center">
              <Text className="text-xs text-gray-500 m-0">
                © {new Date().getFullYear()} {companyName}. All rights
                reserved.
              </Text>

              <Text className="text-xs text-gray-500 mt-2 mb-0">
                Punta Cana, Dominican Republic
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default eventRentalEmail;
