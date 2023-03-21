package com.os.prop.reppo;

import com.os.prop.storage.cscan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface cscanrepo extends JpaRepository<cscan,Integer> {
    List<cscan> findByrun(int run);
}
