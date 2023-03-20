package con.db.controller;

import con.db.reppo.bankersrepo;
import con.db.storage.bankers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/banker")
@CrossOrigin("*")
public class bankerscontroller {
    @Autowired
    private bankersrepo u;

    private List<bankers> testing;

    @PostMapping("/")
    public List<bankers> enterdata(@RequestBody List<bankers> data) {
        int i=1;
        List<bankers> temp = new ArrayList<bankers>();
        boolean checking = true;
        while(checking == true){
            testing = this.u.findByrun(i);
            if (testing.size() == 0){
                for (int j = 0; j < data.size(); j++) {
                    bankers obj =data.get(j);
                    obj.setRun(i);
                    temp.add(obj);
                }
                checking =false;
            }else{
                testing.clear();
                i++;
            }

        }
        data = temp;
        return this.u.saveAll(data);
    }
}
