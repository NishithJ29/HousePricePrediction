import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const MortgageCalculator = ({ propertyPrice }) => {
  const [loanAmount, setLoanAmount] = useState(propertyPrice || 0);
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    const principal = loanAmount;
    const interest = parseFloat(interestRate) / 100 / 12;
    const payments = parseInt(loanTerm) * 12;

    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);

    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <div style={styles.container}>
      <h2>Mortgage Calculator</h2>
      <TextField
        label="Property Price"
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        fullWidth
        style={styles.input}
        disabled
      />
      <TextField
        label="Interest Rate (%)"
        type="number"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        fullWidth
        style={styles.input}
      />
      <TextField
        label="Loan Term (Years)"
        type="number"
        value={loanTerm}
        onChange={(e) => setLoanTerm(e.target.value)}
        fullWidth
        style={styles.input}
      />
      <Button variant="contained" color="primary" onClick={calculateMortgage}>
        Calculate
      </Button>
      {monthlyPayment && (
        <div style={styles.result}>
          <h3>Monthly Payment: ${monthlyPayment}</h3>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px 0',
  },
  input: {
    marginBottom: '15px',
  },
  result: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e0f7fa',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default MortgageCalculator;
