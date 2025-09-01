package com.vipusa.securebackend.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequest {

    private Integer bookId;

    private Integer quantity;
}
