import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import Header from "./components/Header";
import Filters from "./components/Filters";
import DataGridTable from "./components/DataGridTable";

const Base_url = process.env.REACT_APP_API_URL;

const App = () => {
  const [data, setData] = useState([]); // Holds the original data
  const [filteredData, setFilteredData] = useState([]); // Holds the filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortModel, setSortModel] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false); // State for loading rows

  // Fetch all data with filters applied
  const fetchRows = async () => {
    setLoadingRows(true); // Start loading rows
    setError(false);

    try {
      const params = new URLSearchParams({
        page: page + 1,
        limit: pageSize,
        sortField: sortModel.length > 0 ? sortModel[0].field : "",
        sortOrder: sortModel.length > 0 ? sortModel[0].sort : "",
      });

      const response = await fetch(`${Base_url}?${params.toString()}`);

      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      const processedData = result.products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.main_category || "Unknown",
        price: product.mrp?.mrp || 0,
        image: product.images?.front || "https://via.placeholder.com/150",
      }));

      setData(processedData);
      setTotalRows(result.totalResults);
      setCategories([
        ...new Set(result.products.map((p) => p.main_category || "Unknown")),
      ]);
      setFilteredData(processedData); // Set initial filtered data to all fetched data
    } catch (err) {
      console.error("Error fetching rows:", err);
      setError(true);
    } finally {
      setLoadingRows(false); // End loading rows
    }
  };

  useEffect(() => {
    fetchRows();
  }, [page, pageSize, sortModel]); // Dependencies include page, pageSize, and sortModel

  return (
    <Box sx={{ padding: 3 }}>
      <Header title="Product Catalog" />
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        originalData={data} // Pass original data to Filters
        setFilteredData={setFilteredData} // Pass setFilteredData to Filters
      />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to load data</Typography>
      ) : (
        <DataGridTable
          data={filteredData} // Passing filtered data to the table
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalRows={totalRows}
          sortModel={sortModel}
          setSortModel={setSortModel}
          loadingRows={loadingRows} // Pass loadingRows state to DataGridTable
        />
      )}
    </Box>
  );
};

export default App;
