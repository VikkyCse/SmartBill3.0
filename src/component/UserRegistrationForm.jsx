import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function UserRegistrationForm() {
  const [name, setName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [rfid, setRfid] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [usertype, setUserType] = React.useState(false);
  const [gender, setGender] = React.useState(false);
  const [isHosteller, setIsHosteller] = React.useState(false);
  const [naturalAmt, setNaturalAmt] = React.useState(0);
  const [rollNo, setRollNo] = React.useState('');
  const [password, setPassword] = React.useState('');

const apiUrl = 'http://localhost:8000/users/create'
  const HandleRegistration = async () => {
    

    
      const userData = {
        name:name,
        User_name: userName,
        rfid,
        amount,
        usertype,
        gender,
        isHosteller,
        natural_amt: naturalAmt,
        rollNo,
        password,
    }
    try{
      const res = await axios.post(`${apiUrl}`, userData);
      console.log(res);
      toast('🦄Registered Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        setName('');
    setUserName('');
    setRfid('');
    setAmount(0);
    setUserType(false);
    setGender(false);
    setIsHosteller(false);
    setNaturalAmt(0);
    setRollNo('');
    setPassword('');

    }catch(error)
    {
      toast('🦄Not Registered Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.log("error",error);
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
          label="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="User Name"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="RFID"
          value={rfid}
          onChange={(event) => {
            setRfid(event.target.value);
          }}
          fullWidth
          margin="normal"
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
        <TextField
          select
          label="User Type"
          value={usertype}
          onChange={(event) => {
            setUserType(event.target.value);
          }}
          fullWidth
          margin="normal"
        >
          <MenuItem value={true}>Admin</MenuItem>
          <MenuItem value={false}>User</MenuItem>
        </TextField>
        <TextField
          select
          label="Gender"
          value={gender}
          onChange={(event) => {
            setGender(event.target.value);
          }}
          fullWidth
          margin="normal"
        >
          <MenuItem value={true}>Male</MenuItem>
          <MenuItem value={false}>Female</MenuItem>
        </TextField>
        <TextField
          label="Roll No"
          value={rollNo}
          onChange={(event) => {
            setRollNo(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={HandleRegistration} fullWidth>
          Register
        </Button>
      </Box>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
    </Box>
  );
}
