package con.db.controller;

import con.db.reppo.scanrepo;
import con.db.storage.scan;
import con.db.storage.scaner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/scan")
@CrossOrigin("*")
public class scancontroller {
    @Autowired
    private scanrepo u;


    private List<scan> store;
    @PostMapping("/")
    public List<scan> enterdata(@RequestBody scaner data) {

        List<scan> testing = new ArrayList<scan>();
        store= new ArrayList<scan>();
        int j = 1;

        boolean checking = true;
        while (checking == true) {
            testing = this.u.findByrun(j);
            if (testing.size() == 0) {
                for (int i = 0; i < data.getArray().length; i++) {
                    scan s = new scan();
                    s.setHead(data.getHead());
                    int[] a = data.getArray();
                    s.setValue(a[i]);
                    s.setFlow(data.getFlow());
                    s.setRun(j);
                    store.add(s);
                    this.u.save(s);
                }
                checking = false;
            } else {
                testing.clear();
                j++;
            }

        }

        return store;
    }

}
