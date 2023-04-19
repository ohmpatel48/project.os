package com.os.prop.controller;

import com.os.prop.reppo.userinterface;
import com.os.prop.storage.roundrobin;
import com.os.prop.storage.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class usercontroller {
    @Autowired
    private userinterface userrepo;

    @PostMapping("/")
    public user enterdata(@RequestBody user data){
        return this.userrepo.save(data);
    }

    @GetMapping("/{email}")
    public List<user> getemail(@PathVariable String email){
        return this.userrepo.findByemail(email);
    }


}
