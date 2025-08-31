package com.vipusa.securebackend.controller;

import com.vipusa.securebackend.model.entity.Book;
import com.vipusa.securebackend.response.ApiResponse;
import com.vipusa.securebackend.service.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/book")
@CrossOrigin("*")
@Slf4j
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Book>>> findAllBook() {

        List<Book> books = bookService.findAllBooks();

        ApiResponse<List<Book>> response = ApiResponse.<List<Book>>builder()
                .response(books)
                .isSuccess(true)
                .message("Book Fetched Successfully").build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Book>> findBookById(@PathVariable Integer bookId) {

        Book book = bookService.findBookById(bookId); // can throw ResourceNotFoundException

        ApiResponse<Book> response = ApiResponse.<Book>builder()
                .response(book)
                .isSuccess(true)
                .message("Book Fetched Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


}
