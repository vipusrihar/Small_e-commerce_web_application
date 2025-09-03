package com.vipusa.securebackend.service.service;

import com.vipusa.securebackend.model.UserDTO;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    UserDTO getUserInformation(Authentication authentication);
}
