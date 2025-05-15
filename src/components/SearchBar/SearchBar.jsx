import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <TextField
        placeholder="Search..."
        variant="outlined"
        fullWidth
        sx={{
          width: 375,
          backgroundColor: "#fff",
          borderRadius: 10,
          "& .MuiOutlinedInput-root": {
            paddingLeft: 5,
            paddingRight: 1.5, 
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ paddingRight: 1 }}>
              <SearchIcon sx={{ color: "#999" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
