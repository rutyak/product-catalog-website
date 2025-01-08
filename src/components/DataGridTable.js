import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import ViewDetails from "./ViewDetails";

const DataGridTable = ({
  data,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
  sortModel,
  setSortModel
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price ($)",
      flex: 1,
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
      <Box sx={{ width: "100%", height: "495px", overflowX: "auto", background: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <DataGrid
          rows={data}
          getRowId={(row) => `${row.id}-${row.name}`}
          columns={columns}
          pagination
          page={page}
          pageSize={pageSize}
          rowCount={totalRows}
          paginationMode="server"
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sx={{
            minWidth: 800,
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f7fa",
            },
          }}
        />
      </Box>

      {selectedProduct && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, borderRadius: 2, p: 4 }}>
            <ViewDetails open={openModal} onClose={handleCloseModal} productDetails={selectedProduct} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default DataGridTable;
