package com.vipusa.securebackend.repository;

import com.vipusa.securebackend.model.entity.BookOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.vipusa.securebackend.model.enums.STATUS;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface BookOrderRepository extends JpaRepository<BookOrder, Integer> {

    List<BookOrder> findByEmail(String email);

    List<BookOrder> findByEmailAndStatus(String email, STATUS status);

    @Query("SELECT o FROM BookOrder o WHERE o.email = :email AND o.status IN :statuses")
    List<BookOrder> findByEmailAndStatusIn(@Param("email") String email, @Param("statuses") List<STATUS> statuses);
}
