package com.vipusa.securebackend.repository;

import com.vipusa.securebackend.model.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

}
