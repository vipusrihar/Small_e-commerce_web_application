package com.vipusa.securebackend.repository;

import com.vipusa.securebackend.model.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

    @Query("SELECT b FROM Book b WHERE " +
            "LOWER(b.title) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
            "LOWER(b.author) LIKE LOWER(CONCAT('%', :searchText, '%')) OR " +
            "b.isbn LIKE CONCAT('%', :searchText, '%')")
    List<Book> searchBooks(@Param("searchText") String searchText);

}
