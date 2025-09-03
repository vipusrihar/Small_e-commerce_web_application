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

        Map<String, Object> userInfo = new HashMap<>();
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User oauthUser) {
            OAuth2AuthorizedClient client =
                    authorizedClientService.loadAuthorizedClient("asgardeo", authentication.getName());

                if (client != null) {
                    String accessToken = client.getAccessToken().getTokenValue();
                    userInfo.put("access_token", accessToken);

                    if (authentication.getCredentials() instanceof Jwt jwt) {
                        List<String> scopes = jwt.getClaimAsStringList("scp");
                        List<String> roles = jwt.getClaimAsStringList("roles");

                        userInfo.put("allowed_scopes", scopes != null ? scopes : List.of("No scopes found"));
                        userInfo.put("roles", roles != null ? roles : List.of("No roles found"));
                    } else {
                        userInfo.put("allowed_scopes", List.of("Token is opaque or not JWT"));
                    }
                }

                userInfo.putAll(oauthUser.getAttributes());
            } else {
                userInfo.put("error", "No user authenticated");
            }

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail((String) userInfo.get("email"));
        userDTO.setRoles((String) userInfo.get("roles"));
        userDTO.setFamily_name((String) userInfo.get("family_name"));
        userDTO.setGiven_name((String) userInfo.get("given_name"));
        userDTO.setPreferred_username((String) userInfo.get("preferred_username"));
        userDTO.setPhone_number((String) userInfo.get("phone_number"));
        userDTO.setName((String) userInfo.get("name"));
        userDTO.setUsername((String) userInfo.get("username"));

        Map<String, Object> address = (Map<String, Object>) userInfo.get("address");
        if (address != null) {
            userDTO.setCountry((String) address.get("country"));
            userDTO.setPostal_code((String) address.get("postal_code"));
            userDTO.setStreet_address((String) address.get("street_address"));
        }

        System.out.println(userDTO.toString());
        return userDTO;
    }
}
