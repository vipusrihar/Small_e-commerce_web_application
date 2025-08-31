package com.vipusa.securebackend.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T>{

    private boolean isSuccess;

    private  String message;

    private T response;
}
