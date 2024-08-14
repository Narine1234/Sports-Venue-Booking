import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

export const CartCard = ({ item }) => {
  const [members, setMembers] = useState(1);

  const handleIncrement = () => {
    setMembers(members + 1);
  };

  const handleDecrement = () => {
    if (members > 1) {
      setMembers(members - 1);
    }
  };

  const amount = members * item.price; // Assuming each item has a price property

  return (
    <div>
      <Typography variant="h6">{item.timeslot}</Typography>
      <Typography variant="body1">Number of Members:</Typography>
      <div>
        <Button onClick={handleDecrement}>-</Button>
        <Typography>{members}</Typography>
        <Button onClick={handleIncrement}>+</Button>
      </div>
      <Typography variant="body2">Amount: ${amount}</Typography>
      <Button variant="contained" color="primary">Book Now</Button>
    </div>
  );
};
