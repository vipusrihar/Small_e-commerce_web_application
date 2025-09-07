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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
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

        log.info("User [{}] is attempting to create an order", userDTO.getEmail());

        if (!userDTO.getEmail().equals(request.getEmail())) {
            log.warn("Unauthorized order attempt: {} tried to place order for {}",
                    userDTO.getEmail(), request.getEmail());
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot place orders on behalf of another user");
        }

        if (request.getOrderItems() == null || request.getOrderItems().isEmpty()) {
            log.error("Order creation failed for user [{}]: No items provided", userDTO.getEmail());
            throw new IllegalArgumentException("Order must contain at least one product");
        }

        BookOrder bookOrder = new BookOrder();
        bookOrder.setEmail(userDTO.getEmail());

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderItemRequest item : request.getOrderItems()) {
            Book book = bookRepository.findById(item.getBookId())
                    .orElseThrow(() -> {
                        log.error("Book not found with ID: {}", item.getBookId());
                        return new ResourceNotFoundException("Book Not Found With ID " + item.getBookId());
                    });

            if (book.getStock() < item.getQuantity()) {
                log.warn("Not enough stock for book [{}]. Requested: {}, Available: {}",
                        book.getTitle(), item.getQuantity(), book.getStock());
                throw new IllegalArgumentException("Not enough stock for book: " + book.getTitle());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(bookOrder);
            orderItem.setBookName(book.getTitle());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setAmount(book.getPrice() * item.getQuantity());

            // Reduce stock safely
            book.setStock(book.getStock() - item.getQuantity());
            bookRepository.save(book);

            totalAmount += orderItem.getAmount();
            orderItems.add(orderItem);

            log.info("Added book [{}] x{} to order. Remaining stock: {}",
                    book.getTitle(), item.getQuantity(), book.getStock());
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

        BookOrder savedOrder = bookOrderRepository.save(bookOrder);

        log.info("Order [{}] created successfully for user [{}] with total amount {}",
                savedOrder.getId(), savedOrder.getEmail(), savedOrder.getTotalAmount());

        return savedOrder;
    }

    private void checkDate(LocalDate preferred) {
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Colombo"));
        if (preferred.isBefore(today)) {
            log.warn("Invalid preferred date [{}]: before today [{}]", preferred, today);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Preferred date cannot be in the past");
        }
        if (preferred.getDayOfWeek() == DayOfWeek.SUNDAY) {
            log.warn("Invalid preferred date [{}]: Sunday delivery not allowed", preferred);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Delivery cannot be scheduled on Sunday");
        }
    }

    private LOCATION changeToLocation(String location){
        try {
            return LOCATION.valueOf(location.trim().toUpperCase());
        } catch(Exception e) {
            log.error("Invalid location: {}", location, e);
            throw new IllegalArgumentException("Invalid location: " + location);
        }
    }

    @Override
    public BookOrder findOrderById(Integer orderId) {
        log.info("Fetching order with ID: {}", orderId);
        return bookOrderRepository.findById(orderId)
                .orElseThrow(() -> {
                    log.error("Order not found with ID: {}", orderId);
                    return new ResourceNotFoundException("Order Not Found with ID " + orderId);
                });
    }

    public List<BookOrder> findOrdersByEmailAndFilter(Authentication authentication, String filter) {
        UserDTO user = authService.getUserInformation(authentication);
        String email = user.getEmail();
        switch (filter.toUpperCase()) {

            case "DELIVERED":
                return bookOrderRepository.findByEmailAndStatus(email, STATUS.STATUS_DELIVERED);

            case "PROCESSING":
                return bookOrderRepository.findByEmailAndStatusIn(email,
                        STATUS.processingStatuses());

            case "ALL":
            default:
                return bookOrderRepository.findByEmail(email);
        }
    }


}
