package com.os.prop.storage;

import jakarta.persistence.*;

@Entity
@Table(name = "mru")
public class mru {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  long id ;
    private int value;
    private int run;
    private int frames;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int getRun() {
        return run;
    }

    public void setRun(int run) {
        this.run = run;
    }

    public int getFrames() {
        return frames;
    }

    public void setFrames(int frames) {
        this.frames = frames;
    }
}
