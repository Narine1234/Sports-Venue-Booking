// check out

// import React, { useContext, useState } from 'react';
// import Typography from '@mui/joy/Typography';
// import Divider from '@mui/joy/Divider';
// import Button from '@mui/joy/Button';
// import Stack from '@mui/joy/Stack';
// import { useHistory } from 'react-router-dom';
// import { CartContext } from '../AllComp/useCart';
// import Product from './Product';
// import PaymentPage from './PlaceOrder'; // Import the PaymentPage component
// import Dialog from '@mui/material/Dialog';

// const Checkout = () => {
//   const { cartItems, clearCart } = useContext(CartContext);
//   const history = useHistory();
//   const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

//   const handlePlaceOrder = () => {
//     // Implement your order placement logic here
//     // For example, you can show a confirmation message or redirect to a thank you page
//     console.log('Order placed! Implement your logic here.');
//     // clearCart(); // Clear the cart after placing the order
//     setOpenDialog(true); // Open the dialog
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false); // Close the dialog
//     history.push('/'); // Redirect to the home page or any other page after closing the dialog
//   };

//   return (
//     <div>
//       <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
//         Checkout
//       </Typography>
//       <Divider />
//       {cartItems.map((item) => (
//         <Product key={item.id} product={item} />
//       ))}
//       <Divider />
//       <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
//         <Typography variant="h6">Total:</Typography>
//         <Typography variant="h6">${calculateTotal(cartItems)}</Typography>
//       </Stack>
//       <Button
//         variant="solid"
//         color="success"
//         onClick={handlePlaceOrder}
//         sx={{ mt: 2, justifyContent: 'center' }}
//       >
//         Place Order
//       </Button>

//       {/* Payment Page Dialog */}
//       <PaymentPage
//         open={openDialog}
//         onClose={handleCloseDialog}
//         onPlaceOrder={() => {
//           // Additional logic to handle the order placement
//           handleCloseDialog();
//         }}
//       />
//     </div>
//   );
// };

// const calculateTotal = (cartItems) => {
//   return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
// };

// export default Checkout;
