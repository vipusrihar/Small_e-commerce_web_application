import React from "react";
import { useSelector } from "react-redux";

const OrdersTable = () => {

    const orders = useSelector((state) => state.orders.orders)

    
    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full border border-gray-200 rounded-lg shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Order ID</th>
                        <th className="px-4 py-2 border">Customer</th>
                        <th className="px-4 py-2 border">Date</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{order.id}</td>
                                <td className="px-4 py-2 border">{order.customer}</td>
                                <td className="px-4 py-2 border">{order.date}</td>
                                <td className="px-4 py-2 border">{order.status}</td>
                                <td className="px-4 py-2 border">${order.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
