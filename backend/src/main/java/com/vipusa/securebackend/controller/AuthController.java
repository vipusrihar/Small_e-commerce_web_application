package com.vipusa.securebackend.controller;

import com.vipusa.securebackend.model.UserDTO;
import com.vipusa.securebackend.response.ApiResponse;
import com.vipusa.securebackend.service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @GetMapping("/api/user")
    public ResponseEntity<ApiResponse<UserDTO>> getUserInfo(Authentication authentication) {
        UserDTO userDTO = authService.getUserInformation(authentication);

        ApiResponse<UserDTO> response = ApiResponse.
                <UserDTO>builder()
                .response(userDTO)
                .message("User Information Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}