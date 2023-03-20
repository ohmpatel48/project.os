package con.db.storage;

import jakarta.persistence.*;

@Entity
@Table(name="scan")
public class scan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  long id ;
    private int value;
    private int run;
    private int head;
    private String flow;

    public String getFlow() {
        return flow;
    }

    public void setFlow(String flow) {
        this.flow = flow;
    }

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

    public int getHead() {
        return head;
    }

    public void setHead(int head) {
        this.head = head;
    }
}
