package com.vipusa.securebackend.service.serviceImpl;

import com.vipusa.securebackend.Exception.ResourceNotFoundException;
import com.vipusa.securebackend.model.entity.Book;
import com.vipusa.securebackend.repository.BookRepository;
import com.vipusa.securebackend.service.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookServiceImpl implements BookService {


    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book findBookById(Integer bookId) throws ResourceNotFoundException {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Book Not Found With ID " + bookId));
    }


    @Override
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> searchBooks(String searchText) {
        if (searchText == null || searchText.isBlank()) {
            return bookRepository.findAll(); // Return all if search is empty
        }
        return bookRepository.searchBooks(searchText.trim());
    }


}
