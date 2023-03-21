package com.os.prop.controller;

import com.os.prop.reppo.mrurepo;
import com.os.prop.storage.mru;
import com.os.prop.storage.mruer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/mru")
@CrossOrigin("*")
public class mrucontroller {
    @Autowired
    private mrurepo u;


    private List<mru> store;
    @PostMapping("/")
    public List<mru> enterdata(@RequestBody mruer data) {

        List<mru> testing = new ArrayList<mru>();
        store= new ArrayList<mru>();
        int j = 1;

        boolean checking = true;
        while (checking == true) {
            testing = this.u.findByrun(j);
            if (testing.size() == 0) {
                for (int i = 0; i < data.getArray().length; i++) {
                    mru s = new mru();
                    s.setFrames(data.getFrames());
                    int[] a = data.getArray();
                    s.setValue(a[i]);
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
