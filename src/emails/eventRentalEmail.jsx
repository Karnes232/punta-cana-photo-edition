const React = require("react");
const {
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
} = require("@react-email/components");

const eventRentalEmail = ({ name, items }) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  let withOutPrice = false;

  items.forEach((item) => {
    if (item.price === null) {
      withOutPrice = true;
    }
  });

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 font-sans text-gray-900 my-0 mx-0">
          <Container className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Header with Logo */}
            <Section className="bg-blue-500 px-6 py-4 text-center">
              <Img
                src="https://images.ctfassets.net/vpskymlp6aa0/pKzEbbiqIVQrzq8SeaxPy/8fe23dd9429e712b8c681cb2d287056b/logotipo_sertuin_events.png"
                alt="Sertuin Events"
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
                        {item.rentalItem}
                      </Text>
                    </Column>
                    <Column className="w-1/4">
                      <Text className="text-sm text-gray-700 m-0 text-center">
                        {item.quantity}
                      </Text>
                    </Column>
                    <Column className="w-1/4">
                      <Text className="text-sm text-gray-700 m-0 text-right">
                        {item.price
                          ? `$${(item.price * item.quantity).toFixed(2)}`
                          : "**"}
                      </Text>
                    </Column>
                  </Row>
                ))}
              </Section>

              {/* Totals */}
              <Section className="mb-3">
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
              {withOutPrice && (
                <Section className="mb-6">
                  <Column className="w-full">
                    <Text className="text-base font-semibold text-gray-900 m-0 text-right">
                      **Prices will be confirmed
                    </Text>
                  </Column>
                </Section>
              )}

              <Hr className="border-gray-200 my-6" />

              {/* Footer */}
              <Text className="text-sm text-gray-700 leading-6">
                If you have any questions about your order, please contact our
                customer service team at{" "}
                <Link
                  href={`mailto:info@sertuinevents.com`}
                  className="text-blue-500"
                >
                  info@sertuinevents.com
                </Link>
                .
              </Text>

              <Text className="text-sm text-gray-700 leading-6">
                Thank you for choosing Sertuin Events!
              </Text>
            </Section>

            {/* Email Footer */}
            <Section className="bg-gray-200 p-4 text-center">
              <Text className="text-xs text-gray-500 m-0">
                © {new Date().getFullYear()} Sertuin Events. All rights
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

module.exports = eventRentalEmail;
