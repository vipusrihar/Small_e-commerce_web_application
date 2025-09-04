package com.vipusa.securebackend.service.serviceImpl;

import com.vipusa.securebackend.model.UserDTO;
import com.vipusa.securebackend.service.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AuthServiceImpl implements AuthService {

    private final OAuth2AuthorizedClientService authorizedClientService;

    public AuthServiceImpl(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
    }

    @Override
    public UserDTO getUserInformation(Authentication authentication) {
        UserDTO userDTO = new UserDTO();

        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User oauthUser) {
            Map<String, Object> attributes = oauthUser.getAttributes();

            userDTO.setEmail((String) attributes.getOrDefault("email", ""));
            userDTO.setFamily_name((String) attributes.getOrDefault("family_name", ""));
            userDTO.setGiven_name((String) attributes.getOrDefault("given_name", ""));
            userDTO.setPreferred_username((String) attributes.getOrDefault("preferred_username", ""));
            userDTO.setPhone_number((String) attributes.getOrDefault("phone_number", ""));
            userDTO.setName((String) attributes.getOrDefault("name", ""));
            userDTO.setUsername((String) attributes.getOrDefault("username", ""));

            Object addrObj = attributes.get("address");
            if (addrObj instanceof Map<?, ?> address) {
                userDTO.setCountry((String) address.get("country"));
                userDTO.setPostal_code((String) address.get("postal_code"));
                userDTO.setStreet_address((String) address.get("street_address"));
            }

            // Extract roles from JWT if available
            if (authentication.getCredentials() instanceof Jwt jwt) {
                List<String> roles = jwt.getClaimAsStringList("roles");
                if (roles != null) userDTO.setRoles(String.join(",", roles));
            }

        } else {
            throw new RuntimeException("No authenticated user found");
        }

        return userDTO;
    }

}
