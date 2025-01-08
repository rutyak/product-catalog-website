import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
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
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      {/* Search Filter */}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchInput}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Category Filter */}
      <Grid item xs={12} sm={6} md={4}>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          fullWidth
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
  );
};

export default Filters;
