// OrderPDF.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  orderItem: {
    marginVertical: 5,
  },
});

const OrderPDF = ({ orders }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Order Summary</Text>
        {orders.map((order, index) => (
          <View key={index} style={styles.orderItem}>
            <Text>Item: {order.item}</Text>
            <Text>Quantity: {order.quantity}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default OrderPDF;
