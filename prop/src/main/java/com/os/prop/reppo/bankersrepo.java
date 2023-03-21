package com.os.prop.reppo;

import com.os.prop.storage.bankers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface bankersrepo extends JpaRepository<bankers,Integer> {
    List<bankers> findByrun(int run);
}
