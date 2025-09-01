package com.vipusa.securebackend.service.serviceImpl;

import com.vipusa.securebackend.Exception.ResourceNotFoundException;
import com.vipusa.securebackend.model.entity.Book;
import com.vipusa.securebackend.model.entity.BookOrder;
import com.vipusa.securebackend.model.entity.OrderItem;
import com.vipusa.securebackend.model.enums.LOCATION;
import com.vipusa.securebackend.model.enums.STATUS;
import com.vipusa.securebackend.model.request.CreateOrderRequest;
import com.vipusa.securebackend.model.request.OrderItemRequest;
import com.vipusa.securebackend.repository.BookOrderRepository;
import com.vipusa.securebackend.repository.BookRepository;
import com.vipusa.securebackend.service.service.BookOrderService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class BookOrderServiceImpl implements BookOrderService {

    @Autowired
    private BookOrderRepository bookOrderRepository;

    @Autowired
    private BookRepository bookRepository;


    @Override
    public BookOrder createOrder(CreateOrderRequest request) {
        BookOrder bookOrder = new BookOrder();

//        OAuth2AuthorizedClientService authorizedClientService
//        bookOrder.setFirstName(user);

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderItemRequest item : request.getOrderItems()) {
            Integer id = item.getBookId();
            Book book = bookRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Book Not Found With ID " + id));

            if (book.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException("Not enough stock for book: " + book.getTitle());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(bookOrder);
            orderItem.setBookName(book.getTitle());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setAmount(book.getPrice() * item.getQuantity());

            // Reduce Stock
            book.setStock(book.getStock() - item.getQuantity());
            bookRepository.save(book);

            totalAmount += orderItem.getAmount();
            orderItems.add(orderItem);
        }

        bookOrder.setOrderItems(orderItems);
        bookOrder.setTotalAmount(totalAmount);

        bookOrder.setOrderDate(LocalDateTime.now());
        bookOrder.setPreferredDate(request.getPreferredDate());
        bookOrder.setPreferredTime(request.getPreferredTime());
        bookOrder.setPreferredLocation(changeToLocation(request.getPreferredLocation().toUpperCase()));
        bookOrder.setMessage(request.getMessage());
        bookOrder.setStatus(STATUS.STATUS_ORDERED);

        return bookOrderRepository.save(bookOrder);

    }

    private LOCATION changeToLocation(String location){
        return LOCATION.valueOf(location);
    }
    @Override
    public BookOrder findOrderById(Integer orderId) {
        return bookOrderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found with ID " + orderId));
    }

    @Override
    public List<BookOrder> findOrdersByEmail(String email) {
        return bookOrderRepository.findByEmail(email);
    }
}
