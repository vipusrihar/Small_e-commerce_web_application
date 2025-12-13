package com.vipusa.securebackend.service.service;

import com.vipusa.securebackend.model.entity.BookOrder;
import com.vipusa.securebackend.model.request.CreateOrderRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookOrderService {
    BookOrder createOrder(CreateOrderRequest request, Authentication authentication);

    BookOrder findOrderById(Integer orderId);

    List<BookOrder> findOrdersByEmailAndFilter(Authentication authentication, String filter);
}
