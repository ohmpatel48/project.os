package com.os.prop.reppo;

import com.os.prop.storage.roundrobin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface rrinterface extends JpaRepository<roundrobin,Integer>{

    List<roundrobin> findByrun(int run);

}
