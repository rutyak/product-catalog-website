import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ViewDetails from "./ViewDetails";

const DataGridTable = ({
  data,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
  setSortModel,
  loadingRows, // Receive loadingRows from parent
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
          alt={params.row.name}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Product Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "Price ($)", flex: 1 },
    {
      field: "details",
      headerName: "Details",
      flex: 1,
      renderCell: (params) => (
        <button
          style={{
            padding: "5px 10px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
          }}
          onClick={() => handleOpenModal(params.row)}
        >
          View Details
        </button>
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
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={data}
          getRowId={(row) => row.id + row.name}
          columns={columns}
          pagination
          page={page}
          pageSize={pageSize}
          rowCount={totalRows}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(newModel) => setSortModel(newModel)} // Handle sorting
          onPaginationModelChange={(newModel) => {
            setPage(newModel.page);
            setPageSize(newModel.pageSize);
          }}
          sx={{ minWidth: 800 }}
          loading={loadingRows} // Show loading state for rows only
        />
      </Box>
      {selectedProduct && (
        <ViewDetails
          open={openModal}
          onClose={handleCloseModal}
          productDetails={selectedProduct}
        />
      )}
    </>
  );
};

export default DataGridTable;
