import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TransactionDetails from './TransactionDetails';

export default function Dashboard1() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchTransactions = async (date) => {
    try {
      const response = await fetch(`http://localhost:8000/transaction?date=${date}`);
      const transactionsData = await response.json();
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = transactions.reduce((sum, transaction) => sum + parseFloat(transaction.Amount), 0);
      setTotalAmount(total.toFixed(2));
    };
    calculateTotalAmount();
  }, [transactions]);

  useEffect(() => {
    fetchTransactions(selectedDate.toISOString().split('T')[0]);
  }, [selectedDate]);

  return (
    <Box>
     <Box height={100} />
      <h2>Dashboard 1</h2>
      <h3>Today's Transactions</h3>
      <Box display="flex">
        <Box width="70%">
          <TransactionDetails
            selectedDate={selectedDate}
            transactions={transactions}
          />
        </Box>
        <Box width="30%">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3>Total Amount: {totalAmount}</h3>
            </div>
          </div>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </Box>
      </Box>
    </Box>
  );
}
