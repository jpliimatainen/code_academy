/*
 * Tehtävät 1 & 2
 * 
 * @author Juha-Pekka Liimatainen 28.10.2019
 */
package lotto;

import java.util.Arrays;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.geometry.VPos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.stage.Stage;

/**
 *
 * @author jphp-
 */
public class Lotto extends Application {
    private TextField[] inputNumbers;
    private TextField[] resultNumbers;
    private Button draw;
    private Button check;
    
    @Override
    public void start(Stage primaryStage) {
        int i = 0;
        
        Label[] indexes = new Label[7];
        Label[] indexes2 = new Label[7];
        
        inputNumbers = new TextField[7];
        resultNumbers = new TextField[7];
        
        GridPane pane = new GridPane();
        pane.setAlignment(Pos.CENTER);
        pane.setHgap(10);
        pane.setVgap(10);
        pane.setPadding(new Insets(20, 20, 20, 20));
        
        Text sceneTitle = new Text("Syötä tai arvo");
        sceneTitle.setFont(Font.font("Tahoma", FontWeight.BOLD, 18));
        GridPane.setConstraints(sceneTitle, 0, 0, 7, 1, HPos.CENTER, VPos.TOP);
        pane.getChildren().add(sceneTitle);
        
        // add indexes
        for (i = 0; i < 7; i++) {
            indexes[i] = new Label((i + 1) + ".");
            GridPane.setConstraints(indexes[i], i, 1);
            pane.getChildren().add(indexes[i]);
        }
        
        // add fields for input numbers
        for (i = 0; i < 7; i++) {
            inputNumbers[i] = new TextField();
            inputNumbers[i].setPrefColumnCount(2);
            GridPane.setConstraints(inputNumbers[i], i, 2);
            pane.getChildren().add(inputNumbers[i]);
        }
        
        draw = new Button("ARVO");
        draw.setMaxWidth(Double.MAX_VALUE); // make the button to span full row width
        GridPane.setConstraints(draw, 0, 3, 7, 1);
        pane.getChildren().add(draw);
        
        draw.setOnAction((ActionEvent e) -> {
            this.drawAndSetNumbers();
        });
        
        Text sceneTitle2 = new Text("Syötä arvotut numerot");
        sceneTitle2.setFont(Font.font("Tahoma", FontWeight.BOLD, 18));
        GridPane.setConstraints(sceneTitle2, 0, 4, 7, 1, HPos.CENTER, VPos.TOP);
        pane.getChildren().add(sceneTitle2);
        
        // add indexes
        for (i = 0; i < 7; i++) {
            indexes2[i] = new Label((i + 1) + ".");
            GridPane.setConstraints(indexes2[i], i, 5);
            pane.getChildren().add(indexes2[i]);
        }
        
        // add fields for drawn numbers
        for (i = 0; i < 7; i++) {
            resultNumbers[i] = new TextField();
            resultNumbers[i].setPrefColumnCount(2);
            GridPane.setConstraints(resultNumbers[i], i, 6);
            pane.getChildren().add(resultNumbers[i]);
        }
        
        check = new Button("TARKISTA");
        check.setMaxWidth(Double.MAX_VALUE); // make the button to span full row width
        GridPane.setConstraints(check, 0, 7, 7, 1);
        pane.getChildren().add(check);
        
        check.setOnAction((ActionEvent e) -> {
            this.checkAndDisplayResult();
        });
        
        Scene scene = new Scene(pane);
        primaryStage.setScene(scene);
        
        primaryStage.setTitle("Lotto Application");
        primaryStage.show();
    }
    
    public void drawAndSetNumbers() {
        int[] numbers = this.drawNumbers();
        this.setNumbers(numbers);
    }
    
    public int[] drawNumbers() {
        int[] numbers = new int[7];
        int i, j, number;
        boolean found;
        
        // init array with a number greater than 40 to prevent errors when sorting it 
        for (i = 0; i < numbers.length; i++) {
            numbers[i] = 100;
        }
        
        for (i = 0; i < numbers.length; i++) {
            found = false;
            number = (int) (Math.floor(Math.random() * 39)) + 1; // 1-40
            if (i == 0) {
                numbers[i] = number;
            }
            else {
                Arrays.sort(numbers); // sort for the binary search function
                for (j = 0; j <= i; j++) {
                    if (Arrays.binarySearch(numbers, number) >= 0) {
                        // this number is already drawn; draw a new one
                        found = true;
                        break;
                    }
                }
                if (found) { 
                    i--;
                }
                else { // a new number
                    numbers[i] = number;
                }
            }
        }
        Arrays.sort(numbers);
        
        return numbers;
    }
    
    public void setNumbers(int[] numbers) {
        for (int i = 0; i < numbers.length; i++) {
            inputNumbers[i].setText(Integer.toString(numbers[i]));
        }
    }
    
    public void checkAndDisplayResult() {
        int correctNumbers = this.checkResults();
        this.displayResult(correctNumbers);
    }
    
    public int checkResults() {
        int i = 0, correctNumbers = 0;
        int[] inputInts = new int[inputNumbers.length];
        int[] resultInts = new int[resultNumbers.length];
        
        inputInts = this.getIntValues(inputNumbers);
        resultInts = this.getIntValues(resultNumbers);
        Arrays.sort(resultInts); // sort for the binary search function
        
        // check correct numbers
        for (i = 0; i < inputInts.length; i++) {
            if (Arrays.binarySearch(resultInts, inputInts[i]) >= 0) {
                correctNumbers++;
            }
        }
        
        return correctNumbers;
    }
    
    public int[] getIntValues(TextField[] numbers) {
        int arrLength = numbers.length;
        int[] intValues = new int[arrLength];
        
        for (int i = 0; i < arrLength; i++) {
            try {
                intValues[i] = Integer.parseInt(numbers[i].getText());
            }
            catch (NumberFormatException e) {
                intValues[i] = 0; // replace non-integer values with zeroes
            }
        }
        
        return intValues;
    }
    
    public void displayResult(int correctNumbers) {
        Stage stage = new Stage();
        
        VBox vbox = new VBox();
        vbox.setPadding(new Insets(20));
        vbox.setSpacing(25);
        vbox.setAlignment(Pos.CENTER);
        
        Label info = new Label("Oikein oli " + correctNumbers + " numeroa.");
        Button close = new Button("Sulje");
        
        close.setOnAction((ActionEvent e) -> {
            stage.close();
        });
        
        vbox.getChildren().addAll(info, close);
        Scene scene = new Scene(vbox, 600, 300);
        stage.setScene(scene);
        stage.show();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
    
}
