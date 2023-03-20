package con.db.storage;

import jakarta.persistence.*;

@Entity
@Table(name="banker")
public class bankers {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int run;
    private String name;
    private int allocA;
    private int allocB;
    private int allocC;
    private int maxA;
    private int maxB;
    private int maxC;
    private int avaA;
    private int avaB;
    private int avaC;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRun() {
        return run;
    }

    public void setRun(int run) {
        this.run = run;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAllocA() {
        return allocA;
    }

    public void setAllocA(int allocA) {
        this.allocA = allocA;
    }

    public int getAllocB() {
        return allocB;
    }

    public void setAllocB(int allocB) {
        this.allocB = allocB;
    }

    public int getAllocC() {
        return allocC;
    }

    public void setAllocC(int allocC) {
        this.allocC = allocC;
    }

    public int getMaxA() {
        return maxA;
    }

    public void setMaxA(int maxA) {
        this.maxA = maxA;
    }

    public int getMaxB() {
        return maxB;
    }

    public void setMaxB(int maxB) {
        this.maxB = maxB;
    }

    public int getMaxC() {
        return maxC;
    }

    public void setMaxC(int maxC) {
        this.maxC = maxC;
    }

    public int getAvaA() {
        return avaA;
    }

    public void setAvaA(int avaA) {
        this.avaA = avaA;
    }

    public int getAvaB() {
        return avaB;
    }

    public void setAvaB(int avaB) {
        this.avaB = avaB;
    }

    public int getAvaC() {
        return avaC;
    }

    public void setAvaC(int avaC) {
        this.avaC = avaC;
    }


}
