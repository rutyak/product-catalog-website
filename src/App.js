import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "./components/Header";
import Filters from "./components/Filters";
import DataGridTable from "./components/DataGridTable";
const Base_url = process.env.REACT_APP_API_URL;

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortModel, setSortModel] = useState([]);

  const fetchRows = async () => {
    try {
      const params = new URLSearchParams({
        page: page + 1,
        limit: pageSize,
        sort: sortModel.length > 0 ? sortModel[0].field : "",
        order: sortModel.length > 0 ? sortModel[0].sort : "",
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
      setFilteredData(processedData);
    } catch (err) {
      console.error("Error fetching rows:", err);
    }
  };

  useEffect(() => {
    fetchRows();
  }, [page, pageSize, sortModel]);

  return (
    <Box sx={{ padding: 3 }}>
      <Header title="Product Catalog" />
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        originalData={data}
        setFilteredData={setFilteredData}
      />
      <DataGridTable
        data={filteredData}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRows={totalRows}
        sortModel={sortModel}
        setSortModel={setSortModel}
      />
    </Box>
  );
};

export default App;
