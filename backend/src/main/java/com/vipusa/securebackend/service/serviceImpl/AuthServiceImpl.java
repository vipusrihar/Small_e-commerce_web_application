package com.vipusa.securebackend.service.serviceImpl;

import com.vipusa.securebackend.model.UserDTO;
import com.vipusa.securebackend.service.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    @SuppressWarnings("unused")
    private final OAuth2AuthorizedClientService authorizedClientService;

    public AuthServiceImpl(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
    }

    @Override
    public UserDTO getUserInformation(Authentication authentication) {
        if (authentication == null) {
            log.error("Authentication object is null - no user is logged in");
            throw new RuntimeException("No authenticated user found");
        }

        UserDTO userDTO = new UserDTO();

        if (authentication.getPrincipal() instanceof OAuth2User oauthUser) {
            Map<String, Object> attributes = oauthUser.getAttributes();
            log.info("Extracting user information for principal: {}", authentication.getName());

            userDTO.setEmail((String) attributes.getOrDefault("email", ""));
            userDTO.setFamily_name((String) attributes.getOrDefault("family_name", ""));
            userDTO.setGiven_name((String) attributes.getOrDefault("given_name", ""));
            userDTO.setPreferred_username((String) attributes.getOrDefault("preferred_username", ""));
            userDTO.setPhone_number((String) attributes.getOrDefault("phone_number", ""));
            userDTO.setName((String) attributes.getOrDefault("name", ""));
            userDTO.setUsername((String) attributes.getOrDefault("username", ""));

            Object addressObj = attributes.get("address");
            if (addressObj instanceof Map<?, ?> address) {
                userDTO.setCountry((String) address.get("country"));
                userDTO.setPostal_code((String) address.get("postal_code"));
                userDTO.setStreet_address((String) address.get("street_address"));
            }

            // Extract roles from JWT if available
            if (authentication.getCredentials() instanceof Jwt jwt) {
                List<String> roles = jwt.getClaimAsStringList("roles");
                if (roles != null) {
                    userDTO.setRoles(String.join(",", roles));
                    log.info("User [{}] has roles: {}", userDTO.getEmail(), userDTO.getRoles());
                }
            }

            log.info("User [{}] successfully authenticated", userDTO.getEmail());
        } else {
            log.error("Unsupported authentication principal type: {}", authentication.getPrincipal().getClass().getName());
            throw new RuntimeException("No authenticated user found");
        }

        return userDTO;
    }
}
