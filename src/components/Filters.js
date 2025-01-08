import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  originalData,
  setFilteredData,
}) => {
  const [searchInput, setSearchInput] = useState(searchTerm);

  useEffect(() => {
    const filteredData = originalData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchInput.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setFilteredData(filteredData);
  }, [searchInput, selectedCategory, originalData, setFilteredData]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 2,
        background: "linear-gradient(to right, #f7f8fc, #eef1f5)",
      }}
    >
      <Grid container spacing={2}>
        {/* Search Filter */}
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Search Products"
            variant="outlined"
            value={searchInput}
            onChange={handleSearchChange}
            fullWidth
            size="small"
            sx={{
              background: "#fff",
              borderRadius: 2,
              ".MuiInputBase-input": {
                padding: "6px 10px", // Reduce padding
                fontSize: "14px", // Smaller font size
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#1976d2", fontSize: "18px" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Category Filter */}
        <Grid item xs={12} sm={6} md={6}>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            fullWidth
            size="small"
            sx={{
              background: "#fff",
              borderRadius: 2,
              ".MuiSelect-select": {
                padding: "6px 10px", // Reduce padding
                fontSize: "14px", // Smaller font size
              },
            }}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filters;
