/* 
 * Tehtävä 4
 *
 * @author Juha-Pekka Liimatainen 1.11.2019
 *
 */

package messenger;

public class Message {
    private String receiverName;
    private String receiverNumber;
    private String message;

    public Message() {
        this("", "", "");
    }

    public Message(String receiverName, String receiverNumber, String message) {
        this.receiverName = receiverName;
        this.receiverNumber = receiverNumber;
        this.message = message;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverNumber() {
        return receiverNumber;
    }

    public void setReceiverNumber(String receiverNumber) {
        this.receiverNumber = receiverNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "Receiver: " + receiverName + "\nNumber: " + receiverNumber 
                + "\nMessage: " + message + "\n";
    }
}
