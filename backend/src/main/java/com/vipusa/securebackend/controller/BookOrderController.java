package com.vipusa.securebackend.controller;

import com.vipusa.securebackend.model.entity.BookOrder;
import com.vipusa.securebackend.model.request.CreateOrderRequest;
import com.vipusa.securebackend.response.ApiResponse;
import com.vipusa.securebackend.service.service.BookOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class BookOrderController {

    @Autowired
    BookOrderService orderService;

    @PostMapping("/")
    public ResponseEntity<ApiResponse<BookOrder>> createOrder(@RequestBody CreateOrderRequest request) {

        BookOrder createdOrder = orderService.createOrder(request);

        ApiResponse<BookOrder> response = ApiResponse.<BookOrder>builder()
                .response(createdOrder)
                .message("Order Created Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<BookOrder>> findOrderByOrderId(@PathVariable Integer orderId) {

        BookOrder order = orderService.findOrderById(orderId);

        ApiResponse<BookOrder> response = ApiResponse.<BookOrder>builder()
                .response(order)
                .message("Order Fetched Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/user/{email}")
    public ResponseEntity<ApiResponse<List<BookOrder>>> findAllOrdersByEmail(@PathVariable String email) {

        List<BookOrder> orders = orderService.findOrdersByEmail(email);
        ApiResponse<List<BookOrder>> response = ApiResponse.<List<BookOrder>>builder()
                .isSuccess(true)
                .message("Books For User Fetched Successfully")
                .response(orders)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

}
