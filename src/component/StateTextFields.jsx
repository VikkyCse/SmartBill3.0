import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function StateTextFields() {
  const [rfid, setRfid] = useState(''); // Using 'rfid' instead of 'userId'
  const [amount, setAmount] = useState('');

  const handleRecharge = async () => {
    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'PUT', // Use 'PUT' if appropriate
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rfid: rfid, // Include the 'rfid' in the request body
          amount: parseFloat(amount),
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('Recharge successful. Updated user:', updatedUser);
      } else {
        console.error('Recharge failed');
      }
    } catch (error) {
      console.error('Error during recharge:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh', // Ensure the section takes the full viewport height
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-rfid" // Changed the ID to 'outlined-rfid'
          label="RFID"
          value={rfid}
          onChange={(event) => {
            setRfid(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="outlined-amount"
          label="Amount"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleRecharge} fullWidth>
          Recharge
        </Button>
      </Box>
    </Box>
  );
}
