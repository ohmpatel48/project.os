package con.db.reppo;

import con.db.storage.cscan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface cscanrepo extends JpaRepository<cscan,Integer> {
    List<cscan> findByrun(int run);
}
