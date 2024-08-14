import React from 'react';
import Drawer from '@mui/material/Drawer';
import { Button, List, ListItem, ListItemText, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import './CartDrawer.css'; // Import the CSS file for styling

function CartDrawer({ open, onClose, cartItems = [], removeFromCart, updateCartItem }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.members * 100, 0); // Assuming each slot costs a fixed amount, e.g., 100
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className="cart-drawer">
        <div className="cart-header">
          <Typography variant="h5" className="cart-title">
            Cart
          </Typography>
          <IconButton onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </div>
        <List className="cart-items">
          {cartItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.slot} secondary={`Date: ${item.date}`} />
              <IconButton onClick={() => updateCartItem(index, Math.max(item.members - 1, 1))}>
                <Remove />
              </IconButton>
              {item.members}
              <IconButton onClick={() => updateCartItem(index, item.members + 1)}>
                <Add />
              </IconButton>
              <IconButton onClick={() => removeFromCart(index)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Box className="cart-footer">
          <Typography variant="h6" className="total-amount">
            Total Amount: ₹{calculateTotal()}
          </Typography>
          <Button endIcon={<KeyboardArrowRight />} color="success" className="checkout-button">
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default CartDrawer;
