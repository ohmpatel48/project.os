package com.os.prop.reppo;

//import com.os.prop.storage.scan
import com.os.prop.storage.scan;
import com.os.prop.storage.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface userinterface extends JpaRepository<user,Integer> {
    List<user> findByemail(String email);
}
