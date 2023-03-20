package con.db.controller;

import con.db.reppo.cscanrepo;
import con.db.storage.cscan;
import con.db.storage.cscaner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cscan")
@CrossOrigin("*")
public class cscancontroller {
    @Autowired
    private cscanrepo u;


    private List<cscan> store;
    @PostMapping("/")
    public List<cscan> enterdata(@RequestBody cscaner data) {

        List<cscan> testing = new ArrayList<cscan>();
        store= new ArrayList<cscan>();
        int j = 1;

        boolean checking = true;
        while (checking == true) {
            testing = this.u.findByrun(j);
            if (testing.size() == 0) {
                for (int i = 0; i < data.getArray().length; i++) {
                    cscan s = new cscan();
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
