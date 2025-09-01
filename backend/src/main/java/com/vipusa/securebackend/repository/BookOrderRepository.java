package com.vipusa.securebackend.repository;

import com.vipusa.securebackend.model.entity.BookOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookOrderRepository extends JpaRepository<BookOrder, Integer> {
    List<BookOrder> findByEmail(String email);
}
