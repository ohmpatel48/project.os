package con.db.reppo;

import con.db.storage.scan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface scanrepo extends JpaRepository<scan,Integer> {
    List<scan> findByrun(int run);
}
