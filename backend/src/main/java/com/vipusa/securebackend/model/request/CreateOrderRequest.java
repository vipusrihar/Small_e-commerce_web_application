package com.vipusa.securebackend.model.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CreateOrderRequest {

    private String email;

    private List<OrderItemRequest> orderItems;

    private LocalDate preferredDate;

    private String preferredTime;

    private String preferredLocation;

    private String message;
}
