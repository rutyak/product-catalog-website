import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";

const ViewDetails = ({ open, onClose, productDetails }) => {
  if (!productDetails) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: "12px",
          padding: "16px",
          background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#1976d2",
        }}
      >
        Product Details
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        {/* Image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <img
            src={productDetails.image}
            alt={productDetails.name}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid #1976d2",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>

        {/* Product Name */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "8px", color: "#424242" }}
        >
          {productDetails.name}
        </Typography>

        {/* Category */}
        <Typography
          variant="body1"
          sx={{
            color: "#757575",
            marginBottom: "8px",
            fontStyle: "italic",
          }}
        >
          Category: {productDetails.category}
        </Typography>

        {/* Price */}
        <Typography
          variant="h6"
          sx={{
            color: "#1976d2",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Price: ${productDetails.price}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "#424242",
            lineHeight: 1.6,
            marginTop: "8px",
            fontSize: "0.9rem",
          }}
        >
          {productDetails.description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#1259a8",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDetails;
