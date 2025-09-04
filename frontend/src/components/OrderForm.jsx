import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Modal,
  Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LOCATION, TIME } from "../helper/enums";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../state/books/bookAction";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { createOrder } from "../state/order/orderAction";

const OrderForm = ({ open, onClose }) => {
  const user = useSelector((state) => state.auth.auth);
  const [formData, setFormData] = useState({
    date: null,
    time: "",
    district: "",
    orderItems: [],
    message: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const products = useSelector((state) => state.books.books);

  const disableDates = (date) => {
    const today = new Date();
    if (date < today.setHours(0, 0, 0, 0)) return true;
    if (date.getDay() === 0) return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProduct = () => {
    if (!selectedProduct) return;

    setFormData((prev) => ({
      ...prev,
      orderItems: [
        ...prev.orderItems,
        {
          bookId: selectedProduct.id,
          product: selectedProduct.title,
          quantity,
        },
      ],
    }));

    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      orderItems: prev.orderItems.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.orderItems.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const orderData = {
      email: user?.email || "",
      preferredDate: formData.date,
      preferredTime: formData.time,
      preferredLocation: formData.district,
      orderItems: formData.orderItems.map(({ bookId, quantity }) => ({ bookId, quantity })),
      message: formData.message,
    };

    try {
      await dispatch(createOrder(orderData)); // wait for API call
      setFormData({ date: null, time: "", district: "", orderItems: [], message: "" });
      setSelectedProduct(null);
      setQuantity(1);
      onClose(); // ✅ close modal only on success
    } catch (err) {
      alert("Failed to submit order. See console for details.");
    }
  };


  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        onClick={onClose}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          display="flex"
          flexDirection="column"
          gap={2}
          p={3}
          maxWidth={400}
          width="100%"
          border="1px solid #ccc"
          borderRadius={2}
          boxShadow={2}
          bgcolor="white"
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            Place Your Order
          </Typography>

          <TextField
            label="Username"
            value={user?.name || ""}
            InputProps={{ readOnly: true }}
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Purchase"
              value={formData.date}
              onChange={(newDate) =>
                setFormData((prev) => ({ ...prev, date: newDate }))
              }
              shouldDisableDate={disableDates}
              renderInput={(params) => <TextField {...params} required />}
            />
          </LocalizationProvider>

          <TextField
            select
            name="time"
            label="Preferred Delivery Time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            {TIME.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>

          <Autocomplete
            options={LOCATION}
            value={formData.district || null}
            onChange={(e, newValue) =>
              setFormData((prev) => ({ ...prev, district: newValue }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Delivery Location" required />
            )}
          />

          <Box display="flex" gap={1} alignItems="center">
            <Autocomplete
              options={products}
              getOptionLabel={(option) => option.title}
              value={selectedProduct}
              onChange={(e, newValue) => setSelectedProduct(newValue)}
              renderInput={(params) => <TextField {...params} label="Product" />}
              sx={{ flex: 1 }}
            />
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
            <Button variant="contained" onClick={addProduct}>
              <AddIcon />
            </Button>
          </Box>

          <Box>
            {formData.orderItems.map((item, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my={1}
              >
                <span>
                  {item.product} x {item.quantity}
                </span>
                <Button
                  color="error"
                  size="small"
                  onClick={() => removeProduct(index)}
                >
                  <RemoveIcon />
                </Button>
              </Box>
            ))}
          </Box>

          <TextField
            name="message"
            label="Message"
            multiline
            rows={3}
            value={formData.message}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Submit Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderForm;
