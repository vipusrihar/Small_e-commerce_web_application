package com.vipusa.securebackend.service.serviceImpl;

import com.vipusa.securebackend.Exception.ResourceNotFoundException;
import com.vipusa.securebackend.model.UserDTO;
import com.vipusa.securebackend.model.entity.Book;
import com.vipusa.securebackend.model.entity.BookOrder;
import com.vipusa.securebackend.model.entity.OrderItem;
import com.vipusa.securebackend.model.enums.LOCATION;
import com.vipusa.securebackend.model.enums.STATUS;
import com.vipusa.securebackend.model.request.CreateOrderRequest;
import com.vipusa.securebackend.model.request.OrderItemRequest;
import com.vipusa.securebackend.repository.BookOrderRepository;
import com.vipusa.securebackend.repository.BookRepository;
import com.vipusa.securebackend.service.service.AuthService;
import com.vipusa.securebackend.service.service.BookOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class BookOrderServiceImpl implements BookOrderService {

    private final BookOrderRepository bookOrderRepository;

    private final BookRepository bookRepository;

    private final AuthService authService;

    public BookOrderServiceImpl(BookOrderRepository bookOrderRepository,
                                BookRepository bookRepository,
                                AuthService authService) {
        this.bookOrderRepository = bookOrderRepository;
        this.bookRepository = bookRepository;
        this.authService = authService;
    }

    @Override
    @Transactional
    public BookOrder createOrder(CreateOrderRequest request, Authentication authentication) {

        UserDTO userDTO = authService.getUserInformation(authentication);

        if (!userDTO.getEmail().equals(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot place orders on behalf of another user");
        }

        if (request.getOrderItems() == null || request.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one product");
        }

        BookOrder bookOrder = new BookOrder();
        bookOrder.setEmail(userDTO.getEmail());

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderItemRequest item : request.getOrderItems()) {
            Book book = bookRepository.findById(item.getBookId())
                    .orElseThrow(() -> new ResourceNotFoundException("Book Not Found With ID " + item.getBookId()));

            if (book.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException("Not enough stock for book: " + book.getTitle());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(bookOrder);
            orderItem.setBookName(book.getTitle());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setAmount(book.getPrice() * item.getQuantity());

            // Reduce Stock safely
            book.setStock(book.getStock() - item.getQuantity());
            bookRepository.save(book);

            totalAmount += orderItem.getAmount();
            orderItems.add(orderItem);
        }

        bookOrder.setOrderItems(Collections.unmodifiableList(orderItems));

        bookOrder.setTotalAmount(totalAmount);

        checkDate(request.getPreferredDate());

        bookOrder.setOrderDate(LocalDateTime.now(ZoneId.of("Asia/Colombo")));
        bookOrder.setPreferredDate(request.getPreferredDate());
        bookOrder.setPreferredTime(request.getPreferredTime());
        bookOrder.setPreferredLocation(changeToLocation(request.getPreferredLocation()));
        bookOrder.setMessage(request.getMessage());
        bookOrder.setStatus(STATUS.STATUS_ORDERED);

        return bookOrderRepository.save(bookOrder);
    }

    private void checkDate(LocalDate preferred) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Colombo"));
        if (preferred.isBefore(today)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Preferred date cannot be in the past");
        }
        if (preferred.getDayOfWeek() == DayOfWeek.SUNDAY) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Delivery cannot be scheduled on Sunday");
        }
    }


    private LOCATION changeToLocation(String location){
        try {
            return LOCATION.valueOf(location.trim().toUpperCase());
        } catch(Exception e) {
            throw new IllegalArgumentException("Invalid location: " + location);
        }
    }

    @Override
    public BookOrder findOrderById(Integer orderId) {
        return bookOrderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found with ID " + orderId));
    }

    @Override
    public List<BookOrder> findOrdersByEmail(Authentication authentication) {
        UserDTO user = authService.getUserInformation(authentication);
        String email = user.getEmail();
        return bookOrderRepository.findByEmail(email);
    }
}
