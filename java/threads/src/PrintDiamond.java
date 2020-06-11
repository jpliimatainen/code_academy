/* 
 * Tehtävä 1
 *
 * @author Juha-Pekka Liimatainen 30.10.2019
 *
 */
package diamond;

public class PrintDiamond implements Runnable {
    private int rows;
    private char character;

    public PrintDiamond(int rows, char character) {
        this.rows = rows;
        this.character = character;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public char getCharacter() {
        return character;
    }

    public void setCharacter(char character) {
        this.character = character;
    }

    @Override
    public void run() {
        this.print();
    }
    
    public void print() {
        int rows = this.getRows();
        String charStr = Character.toString(this.getCharacter());
        int center = (int) (rows / 2.0);
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < rows; j++) {
                if (i <= center) { // rows 0 - center
                    if (Math.abs(center - j) <= i) {
                        System.out.print(charStr);
                    }
                    else {
                        System.out.print(" ");
                    }
                }
                else { // rows (center+1)- (rows-1)
                    if (Math.abs(center - j) < rows - i) {
                        System.out.print(charStr);
                    }
                    else {
                        System.out.print(" ");
                    }
                }
            }
            System.out.println();
        }
        System.out.println();
    }
}
