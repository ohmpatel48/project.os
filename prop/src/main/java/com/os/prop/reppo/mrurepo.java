package com.os.prop.reppo;


import com.os.prop.storage.mru;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface mrurepo extends JpaRepository<mru,Integer> {

    List<mru> findByrun(int run);
}
