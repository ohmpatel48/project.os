package con.db.storage;

import jakarta.persistence.*;

@Entity
@Table(name="rr")
public class roundrobin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int run;
    private String name;
    private int arrival;
    private int burst;
    private int start;
    private int compilation;
    private int rt;
    private int waiting;
    private int turnaround;

    public roundrobin() {
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getArrival() {
        return arrival;
    }

    public void setArrival(int realtime) {
        this.arrival = realtime;
    }

    public int getBurst() {
        return burst;
    }

    public void setBurst(int burst) {
        this.burst = burst;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getCompilation() {
        return compilation;
    }

    public void setCompilation(int compilation) {
        this.compilation = compilation;
    }

    public int getRt() {
        return rt;
    }

    public void setRt(int rt) {
        this.rt = rt;
    }

    public int getWaiting() {
        return waiting;
    }

    public void setWaiting(int waiting) {
        this.waiting = waiting;
    }

    public int getTurnaround() {
        return turnaround;
    }

    public void setTurnaround(int turnaround) {
        this.turnaround = turnaround;
    }

    public int getRun() {
        return run;
    }

    public void setRun(int run) {
        this.run = run;
    }
}
