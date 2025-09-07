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
import DOMPurify from "dompurify";

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

  const products = useSelector((state) => state.books.books) || [];

  // Disable past dates and Sundays
  const disableDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: DOMPurify.sanitize(value),
    }));
  };

  // Add product to order
  const addProduct = () => {
    if (!selectedProduct) return;

    const existingIndex = formData.orderItems.findIndex(
      (item) => item.bookId === selectedProduct.id
    );
    if (existingIndex !== -1) {
      alert("Product already added. Adjust quantity instead.");
      return;
    }

    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      orderItems: [
        ...prev.orderItems,
        {
          bookId: selectedProduct.id,
          product: DOMPurify.sanitize(selectedProduct.title),
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

    if (!user?.email) {
      alert("You must be logged in to place an order.");
      return;
    }

    if (!formData.date || !formData.time || !formData.district) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.orderItems.length === 0) {
      alert("Please add at least one product.");
      return;
    }

    const formattedDate = formData.date.toISOString().split("T")[0];

    const orderData = {
      email: DOMPurify.sanitize(user.email),
      preferredDate: formattedDate,
      preferredTime: DOMPurify.sanitize(formData.time),
      preferredLocation: DOMPurify.sanitize(formData.district),
      orderItems: formData.orderItems.map(({ bookId, quantity }) => ({
        bookId,
        quantity,
      })),
      message: DOMPurify.sanitize(formData.message),
    };

    try {
      await dispatch(createOrder(orderData)); 

      setFormData({
        date: null,
        time: "",
        district: "",
        orderItems: [],
        message: "",
      });
      setSelectedProduct(null);
      setQuantity(1);
      onClose();
    } catch (err) {
      alert("Failed to submit order.");
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
            value={DOMPurify.sanitize(user?.name || "")}
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
                {DOMPurify.sanitize(t)}
              </MenuItem>
            ))}
          </TextField>

          <Autocomplete
            options={LOCATION}
            value={formData.district || null}
            onChange={(e, newValue) =>
              setFormData((prev) => ({
                ...prev,
                district: DOMPurify.sanitize(newValue),
              }))
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
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value)))
              }
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
                  {DOMPurify.sanitize(item.product)} x {item.quantity}
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
            value={DOMPurify.sanitize(formData.message)}
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
