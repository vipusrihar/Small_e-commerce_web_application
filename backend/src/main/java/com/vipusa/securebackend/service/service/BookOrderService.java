package com.vipusa.securebackend.service.service;

import com.vipusa.securebackend.model.entity.BookOrder;
import com.vipusa.securebackend.model.request.CreateOrderRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookOrderService {
    BookOrder createOrder(CreateOrderRequest request);

    BookOrder findOrderById(Integer orderId);

    List<BookOrder> findOrdersByEmail(String email);
}
