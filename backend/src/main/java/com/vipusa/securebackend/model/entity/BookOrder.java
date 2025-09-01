package com.vipusa.securebackend.model.entity;

import com.vipusa.securebackend.model.enums.LOCATION;
import com.vipusa.securebackend.model.enums.STATUS;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;

    private String firstName;

    private String lastName;

    private LocalDateTime orderDate;

    private LocalDate preferredDate;

    private String preferredTime;

    private LOCATION preferredLocation;

    private String message;

    private Double totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    private STATUS status = STATUS.STATUS_ORDERED;

}

