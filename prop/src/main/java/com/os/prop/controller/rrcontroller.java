package com.os.prop.controller;

import com.os.prop.reppo.rrinterface;
import com.os.prop.storage.roundrobin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/roundrobin")
@CrossOrigin("*")
public class rrcontroller {
    @Autowired
    private rrinterface u;

    private List<roundrobin> testing;

    @PostMapping("/")
    public List<roundrobin> enterdata(@RequestBody List<roundrobin> data) {
        int i = 1;
        List<roundrobin> temp = new ArrayList<roundrobin>();
        boolean checking = true;
        while (checking == true) {
            testing = this.u.findByrun(i);
            if (testing.size() == 0) {
                for (int j = 0; j < data.size(); j++) {
                    roundrobin ob = data.get(j);
                    ob.setRun(i);
                    temp.add(ob);
                }
                checking = false;
            } else {
                testing.clear();
                i++;
            }

        }
        data = temp;
        return this.u.saveAll(data);
    }
}
