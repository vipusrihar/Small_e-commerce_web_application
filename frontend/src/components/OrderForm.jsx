import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LOCATION, TIME } from "../helper/enums";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../state/books/bookAction";

const OrderForm = ({ username = "Vipu" }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [district, setDistrict] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    const products = useSelector((state) => state.books.books);



  // Disable past dates & Sundays
  const disableDates = (date) => {
    const today = new Date();
    if (date < today.setHours(0, 0, 0, 0)) return true; 
    if (date.getDay() === 0) return true; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      username,
      date,
      time,
      district,
      product,
      quantity,
      message,
    };
    console.log("Order Submitted:", orderData);

  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      gap={2}
      p={3}
      maxWidth={400}
      mx="auto"
      border="1px solid #ccc"
      borderRadius={2}
      boxShadow={2}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Place Your Order
      </Typography>

      <TextField label="Username" value={username} InputProps={{ readOnly: true }} />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date of Purchase"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          shouldDisableDate={disableDates}
          renderInput={(params) => <TextField {...params} required />}
        />
      </LocalizationProvider>

      <TextField
        select
        label="Preferred Delivery Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      >
        {TIME.map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Delivery Location"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        required
      >
        {LOCATION.map((d) => (
          <MenuItem key={d} value={d}>
            {d}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        required
      >
        {products.map((p) => (
          <MenuItem key={p.id} value={p.title}>
            {p.title}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="number"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        inputProps={{ min: 1 }}
        required
      />
      <TextField
        label="Message"
        multiline
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit Order
      </Button>
    </Box>
  );
};

export default OrderForm;
