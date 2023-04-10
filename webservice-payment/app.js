const express = require('express');
const soap = require('soap');

const app = express();

const paymentService = {
  Payment_Service: {
    Payment_Port: {
      MakePayment: function(args) {
        const payment = {
          paymentId: '12345',
          amount: args.amount,
          currency: args.currency,
          paymentDate: new Date(),
          status: 'success'
        };
        return payment;
      }
    }
  }
};

const wsdl = `
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://example.com/payment/service/"
             targetNamespace="http://example.com/payment/service/">
  <types>
    <xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                targetNamespace="http://example.com/payment/service/">
      <xsd:element name="payment">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="paymentId" type="xsd:string" />
            <xsd:element name="amount" type="xsd:decimal" />
            <xsd:element name="currency" type="xsd:string" />
            <xsd:element name="paymentDate" type="xsd:date" />
            <xsd:element name="status" type="xsd:string" />
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="makePayment">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="amount" type="xsd:decimal" />
            <xsd:element name="currency" type="xsd:string" />
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>
  <message name="PaymentRequest">
    <part name="paymentRequest" element="tns:makePayment" />
  </message>
  <message name="PaymentResponse">
    <part name="paymentResponse" element="tns:payment" />
  </message>
  <portType name="Payment_PortType">
    <operation name="MakePayment">
      <input message="tns:PaymentRequest" />
      <output message="tns:PaymentResponse" />
    </operation>
  </portType>
  <binding name="Payment_Binding" type="tns:Payment_PortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http" />
    <operation name="MakePayment">
      <soap:operation soapAction="MakePayment" />
      <input>
        <soap:body use="literal" />
      </input>
      <output>
        <soap:body use="literal" />
      </output>
    </operation>
  </binding>
  <service name="Payment_Service">
    <port name="Payment_Port" binding="tns:Payment_Binding">
      <soap:address location="http://localhost:3000/payment" />
    </port>
  </service>
</definitions>
`;

const server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

const soapServer = soap.listen(server, '/payment', paymentService, wsdl);
