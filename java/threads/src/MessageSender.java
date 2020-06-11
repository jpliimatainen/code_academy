/* 
 * Tehtävä 4
 *
 * @author Juha-Pekka Liimatainen 1.11.2019
 *
 */

package messenger;

import java.util.ArrayList;

public class MessageSender implements IMessageSender, Runnable {
    private ArrayList<Message> messages;

    public MessageSender() {
        messages = new ArrayList<>();
        Thread t = new Thread(this); // init print method thread
        t.start();
    }

    @Override
    public synchronized void sendMessage(Message msg) {
        messages.add(msg);
        this.notifyAll(); // notify other threads
    }
    
    private synchronized void printMessage() {
        while (messages.size() == 0) {
            try {
                this.wait(); // wait until a message received
            } catch (InterruptedException ex) {
                System.out.println(ex.getMessage());
            }
        }
        // print the last item in the list
        System.out.println(messages.remove(messages.size() -1).toString());
    }

    @Override
    public void run() {
        this.printMessage();
    }
}
