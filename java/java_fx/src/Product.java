/*
 * Tehtävät 3 & 4
 * 
 * @author Juha-Pekka Liimatainen 28.10.2019
 */
package webstore;

public class Product {
    private String name;
    private String type;
    private String date;
    private double price;
    private String buyer;

    public Product() {
        this("", "", "", 0.0, "");
    }

    public Product(String name, String type, String date, double price, String buyer) {
        this.name = name;
        this.type = type;
        this.date = date;
        this.price = price;
        this.buyer = buyer;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }
}
