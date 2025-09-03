package com.vipusa.securebackend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String roles;
    private String preferred_username;
    private String email;
    private String given_name;
    private String name;
    private String phone_number;
    private String family_name;
    private String username;
    private String country;
    private String street_address;
    private String postal_code;
}
