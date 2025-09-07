import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByEmail } from "../state/order/orderAction";
import {
  Card, CardContent, Table, TableHead, TableRow, TableCell,
  TableBody, Typography, Chip, Tabs, Tab
} from "@mui/material";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    dispatch(getOrdersByEmail(statusFilter));
  }, [dispatch, statusFilter]);


  const headings = [
    "ID", "Preferred Location", "Preferred Date", "Preferred Time", "Status", "Amount", "Message"
  ];

  const statusColors = {
    STATUS_ORDERED: "warning",
    STATUS_ACCEPTED: "info",
    STATUS_PACKING: "info",
    STATUS_SHIPPED: "secondary",
    STATUS_DELIVERED: "success",
    STATUS_CANCELLED: "error",
    STATUS_REJECTED: "error"
  };

  const filterOptions = ["ALL", "PROCESSING", "DELIVERED"];

  return (
    <div className="p-6 pt-0">
      <Card className="shadow-lg border-2 rounded-2xl">
        <CardContent>
          <Tabs
            value={statusFilter}
            onChange={(e, newValue) => setStatusFilter(newValue)}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            {filterOptions.map((opt) => (
              <Tab key={opt} value={opt} label={opt} />
            ))}
          </Tabs>

          <Table>
            <TableHead>
              <TableRow>
                {headings.map((h) => (
                  <TableCell key={h} sx={{ fontWeight: "bold" }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.preferredLocation}</TableCell>
                    <TableCell>{order.preferredDate}</TableCell>
                    <TableCell>{order.preferredTime}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status.replace("STATUS_", "")}
                        color={statusColors[order.status] || "default"}
                        variant="filled"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">
                        Rs. {order.totalAmount}
                      </Typography>
                    </TableCell>
                    <TableCell>{order.message || "-"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersTable;
