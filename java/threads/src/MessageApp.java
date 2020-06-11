/* 
 * Tehtävä 4
 *
 * @author Juha-Pekka Liimatainen 1.11.2019
 *
 */

package messenger;

import java.util.Scanner;

public class MessageApp {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        String message, number, receiver;
        Message msg;
        Thread tSender;
        
        IMessageSender ims = new MessageSender();
        
        System.out.println("Anna vastaanottaja");
        receiver = input.nextLine();
        System.out.println("Anna numero");
        number = input.nextLine();
        System.out.println("Anna viesti");
        message = input.nextLine();
        
        msg = new Message(receiver, number, message);
        
        Runnable rSender = new Runnable() {
            @Override
            public void run() {
                ims.sendMessage(msg);
            }
        };
        
        tSender = new Thread(rSender);
        tSender.start();
    }
}
