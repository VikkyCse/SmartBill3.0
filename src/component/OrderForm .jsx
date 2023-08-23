import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';

const OrderForm = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showPDF, setShowPDF] = useState(false);

  const handlePrintPDF = () => {
    setShowPDF(true);
  };

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/item');
      const itemsData = await response.json();
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddOrder = () => {
    if (selectedItem && quantity) {
      const selectedItemObj = items.find((item) => item.id === selectedItem);
      const newOrder = {
        item: selectedItemObj.name,
        quantity: parseInt(quantity),
      };
      setOrders([...orders, newOrder]);
      setSelectedItem('');
      setQuantity('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          maxWidth: '75%',
          width: '100%',
          gap: '10px',
        }}
        noValidate
        autoComplete="off"
      >
        <Select
          label="Select Item"
          value={selectedItem}
          onChange={(event) => setSelectedItem(event.target.value)}
          fullWidth
          margin="normal"
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddOrder}>
          Add Order
        </Button>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {orders.map((order, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ccc',
              maxWidth: '75%',
              width: '100%',
              padding: '10px',
              margin: '10px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <p>Order {index + 1}</p>
            <p>Item: {order.item}</p>
            <p>Quantity: {order.quantity}</p>
          </div>
        ))}
      </div>
      <Button style={{ position: 'absolute', bottom: 0 }} variant="contained" color="primary" onClick={handlePrintPDF} fullWidth>
        Print PDF
      </Button>
      {showPDF && (
        <PDFViewer style={{ width: '100%', height: 'calc(100vh - 300px)' }}>
          <Document>
            {orders.map((order, index) => (
              <Page key={index}>
                <Text>Order {index + 1}</Text>
                <Text>Item: {order.item}</Text>
                <Text>Quantity: {order.quantity}</Text>
              </Page>
            ))}
          </Document>
        </PDFViewer>
      )}
    </Box>
  );
};

export default OrderForm;
