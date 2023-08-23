import { Box } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'
import StateTextFields from './StateTextFields'

const Recharge = () => {
  return (
    <div>
      <Box height={50} />
     <center><h1>Recharge</h1></center> 
      <StateTextFields />
      <ToastContainer />
    </div>
  )
}

export default Recharge
