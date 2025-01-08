import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const ViewDetails = ({ open, onClose, productDetails }) => {
  if (!productDetails) return null;  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        <img
          src={productDetails.image}
          alt={productDetails.name}
          style={{ width: "150px", height: "150px", objectFit: "cover", marginBottom: "16px" }}
        />
        <Typography variant="h6">{productDetails.name}</Typography>
        <Typography variant="body1" color="textSecondary">Category: {productDetails.category}</Typography>
        <Typography variant="body1">Price: ${productDetails.price}</Typography>
        <Typography variant="body2" color="textSecondary">{productDetails.description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDetails;
