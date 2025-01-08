import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
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

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'rating',
      sort: 'desc',
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
            cursor: "pointer",
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
      <Box sx={{ width: "100%", height: "555px", overflowX: "auto" }}>
        <DataGrid
          rows={data}
          getRowId={(row) => `${row.id}-${row.name}`} // Improved uniqueness
          columns={columns}
          pagination
          page={page - 1} // Adjusted for 0-based index used by DataGrid
          pageSize={pageSize}
          rowCount={Number(totalRows)}
          paginationMode="server"
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          onPaginationModelChange={(newModel) => {
            setPage(newModel.page + 1); // Adjust back to 1-based index
            setPageSize(newModel.pageSize);
          }}
          sx={{ minWidth: 800 }}
          loading={loading}
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
