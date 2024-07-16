import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const LimitModal = ({ open, setOpen }) => {
  const [limit, setLimit] = React.useState("low");

  const handleChange = (event) => {
    setLimit(event.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={setOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "#000", fontWeight: "700", fontSize: "30px" }}
        >
          Set the price limit
        </Typography>
        <FormControl fullWidth>
          <TextField
            id="standard-basic"
            label="Price"
            variant="standard"
            sx={{ mb: 5 }}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Limit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            defaultValue={'low'}
            label="Limit"
            onChange={handleChange}
          >
            <MenuItem value={"high"}>High</MenuItem>
            <MenuItem value={"low"}>Low</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{ marginTop: "30px" }} variant="contained">
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
