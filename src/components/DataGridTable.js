import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useDemoData } from "@mui/x-data-grid-generator";
import ViewDetails from "./ViewDetails";

const DataGridTable = ({
  data,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 500,
    maxColumns: 6,
  });

  const [sortModel, setSortModel] = useState([
    {
      field: "rating",
      sort: "desc",
    },
  ]);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name || "Product"}
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 2,
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "price",
      headerName: "Price ($)",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleOpenModal(params.row)}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": { backgroundColor: "#1259a8" },
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "495px",
          overflowX: "auto",
          background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataGrid
          rows={data}
          getRowId={(row) => `${row.id}-${row.name}`}
          columns={columns}
          pagination
          page={page - 1}
          pageSize={pageSize}
          rowCount={Number(totalRows)}
          paginationMode="server"
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          onPaginationModelChange={(newModel) => {
            setPage(newModel.page + 1);
            setPageSize(newModel.pageSize);
          }}
          sx={{
            minWidth: 800,
            "& .super-app-theme--header": {
              fontWeight: "bold",
            },
            "& .super-app-theme--cell": {
              fontSize: "0.875rem",
              fontWeight: 500,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f7fa",
            },
          }}
          loading={loading}
        />
      </Box>

      {/* Modal for Viewing Details */}
      {selectedProduct && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 4,
            }}
          >
            <ViewDetails
              open={openModal}
              onClose={handleCloseModal}
              productDetails={selectedProduct}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default DataGridTable;
