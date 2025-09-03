import React from 'react'
import OrdersTable from '../components/OrdersTable';
import AddIcon from '@mui/icons-material/Add';

const OrdersPage = () => {
    return (
        <div className="p-6">
            <div className="flex justify-end mb-4 mr-5">
                <button className="bg-blue-500 text-white p-2 rounded-full shadow hover:bg-blue-600">
                    <AddIcon />
                </button>
            </div>

            <OrdersTable />
        </div>
    )
}

export default OrdersPage
