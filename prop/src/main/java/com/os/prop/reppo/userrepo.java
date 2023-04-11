package com.os.prop.reppo;

import com.os.prop.storage.scan;
import com.os.prop.storage.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface userrepo extends JpaRepository<user,Integer> {

    Optional<user> findByEmail(String email);

}
