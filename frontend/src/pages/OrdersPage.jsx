import React, { useState } from "react";
import OrdersTable from "../components/OrdersTable";
import AddIcon from "@mui/icons-material/Add";
import OrderForm from "../components/OrderForm";
import { Typography, Fab, Box } from "@mui/material";

const OrdersPage = () => {
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <Box className="p-6">
      <Box className="flex items-center justify-between mb-6">

        <Box className="w-12" />

        <Typography variant="h5" fontWeight="bold" className="text-center flex-1">
          My Orders
        </Typography>

        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAdd}
          className="shadow"
          size="medium"
        >
          <AddIcon />
        </Fab>
      </Box>

      <OrdersTable />

      <OrderForm open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default OrdersPage;
