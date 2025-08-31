package com.vipusa.securebackend.service.service;

import com.vipusa.securebackend.model.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {

    Book findBookById(Integer bookId);

    List<Book> findAllBooks();
}
