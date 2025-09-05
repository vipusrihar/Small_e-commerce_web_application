package com.vipusa.securebackend.service.serviceImpl;

import com.vipusa.securebackend.Exception.ResourceNotFoundException;
import com.vipusa.securebackend.model.entity.Book;
import com.vipusa.securebackend.repository.BookRepository;
import com.vipusa.securebackend.service.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book findBookById(Integer bookId) throws ResourceNotFoundException {
        log.info("Searching for book with ID: {}", bookId);
        return bookRepository.findById(bookId)
                .orElseThrow(() -> {
                    log.warn("Book not found with ID: {}", bookId);
                    return new ResourceNotFoundException("Book Not Found With ID " + bookId);
                });
    }

    @Override
    public List<Book> findAllBooks() {
        log.info("Fetching all books");
        return bookRepository.findAll();
    }

    @Override
    public List<Book> searchBooks(String searchText) {
        if (searchText == null || searchText.isBlank()) {
            log.info("Empty search text provided, returning all books");
            return bookRepository.findAll();
        }
        log.info("Searching books with keyword: {}", searchText);
        return bookRepository.searchBooks(searchText.trim());
    }
}
