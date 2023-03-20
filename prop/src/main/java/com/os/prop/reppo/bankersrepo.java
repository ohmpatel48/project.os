package con.db.reppo;

import con.db.storage.bankers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface bankersrepo extends JpaRepository<bankers,Integer> {
    List<bankers> findByrun(int run);
}
