import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function NaturalsRegistrationForm() {
  const [user_id, setUser_id] = React.useState('');
  const [time, setTime] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleRegistration = () => {
    
    const naturalsData = {
      user_id,
      time,
      amount,
    };
    console.log('Registering Naturals:', naturalsData);
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
          label="User ID"
          value={user_id}
          onChange={(event) => {
            setUser_id(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Time"
          type="datetime-local"
          value={time}
          onChange={(event) => {
            setTime(event.target.value);
          }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
       
        <Button variant="contained" color="primary" onClick={handleRegistration} fullWidth>
          Register Naturals
        </Button>
      </Box>
    </Box>
  );
}
