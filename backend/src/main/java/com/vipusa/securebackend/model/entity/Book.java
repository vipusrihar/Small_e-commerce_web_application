package com.vipusa.securebackend.model.entity;

import com.vipusa.securebackend.model.enums.BookCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String author;

    @Column(unique = true)
    private String isbn;

    private String description;

    @Enumerated(EnumType.STRING)
    private BookCategory category;

    private String imageLink;

    private Double price;

    private Integer stock;
}
