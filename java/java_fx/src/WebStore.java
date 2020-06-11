/*
 * Tehtävät 3 & 4
 * 
 * @author Juha-Pekka Liimatainen 28.10.2019
 */
package webstore;

import java.time.format.DateTimeFormatter;
import javafx.application.Application;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.stage.Stage;

public class WebStore extends Application {
    private TextField productName;
    private ComboBox<String> productTypes;
    private DatePicker date;
    private TextField price;
    private TextField buyer;
    private Product product;
    
    @Override
    public void start(Stage primaryStage) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        product = new Product();
        
        /* Top pane: include form components to add a new product */
        GridPane gridPaneTop = new GridPane();
        gridPaneTop.setAlignment(Pos.CENTER);
        gridPaneTop.setHgap(20);
        gridPaneTop.setVgap(30);
        gridPaneTop.setPadding(new Insets(20, 20, 20, 20));
        
        Image logoImg = new Image("https://portal.savonia.fi/amk/sites/default/files/savonialogo_0_1.png");
        ImageView iw = new ImageView(logoImg);
        Label logoLbl = new Label("", iw);       
        GridPane.setConstraints(logoLbl, 0, 0, 2, 1);
        gridPaneTop.getChildren().add(logoLbl);
        
        Label nameLbl = new Label("Tuote:");
        productName = new TextField();
        productName.setPrefColumnCount(25);
        GridPane.setConstraints(nameLbl, 0, 1);
        GridPane.setConstraints(productName, 1, 1);
        gridPaneTop.getChildren().addAll(nameLbl, productName);
        
        ObservableList<String> options = FXCollections.observableArrayList(
                "Valitse",
                "Hiiri",
                "Monitori",
                "Tietokone",
                "Tulostin"
        );
        
        Label typeLbl = new Label("Tuotetyyppi:");
        productTypes = new ComboBox<>(options);
        productTypes.setValue("Valitse");
        GridPane.setConstraints(typeLbl, 0, 2);
        GridPane.setConstraints(productTypes, 1, 2);
        gridPaneTop.getChildren().addAll(typeLbl, productTypes);
        
        Label dateLbl = new Label("Käyttöönottopäivä:");
        date = new DatePicker();
        GridPane.setConstraints(dateLbl, 0, 3);
        GridPane.setConstraints(date, 1, 3);
        gridPaneTop.getChildren().addAll(dateLbl, date);
        
        Label priceLbl = new Label("Myyntihinta:");
        price = new TextField();
        price.setPrefColumnCount(10);
        GridPane.setConstraints(priceLbl, 0, 4);
        GridPane.setConstraints(price, 1, 4);
        gridPaneTop.getChildren().addAll(priceLbl, price);
        
        Label buyerLbl = new Label("Ostaja:");
        buyer = new TextField();
        buyer.setPrefColumnCount(25);
        GridPane.setConstraints(buyerLbl, 0, 5);
        GridPane.setConstraints(buyer, 1, 5);
        gridPaneTop.getChildren().addAll(buyerLbl, buyer);  
        
        Button saveBtn = new Button("Tallenna");
        Button closeBtn = new Button("Sulje");
        GridPane.setConstraints(saveBtn, 0, 6);
        GridPane.setConstraints(closeBtn, 1, 6);
        gridPaneTop.getChildren().addAll(saveBtn, closeBtn);
        
        
        /* Bottom pane: show product object data */
        GridPane gridPaneBottom = new GridPane();
        gridPaneBottom.setAlignment(Pos.CENTER);
        gridPaneBottom.setHgap(20);
        gridPaneBottom.setVgap(30);
        gridPaneBottom.setPadding(new Insets(20, 20, 20, 20));
        
        Label outputInfo = new Label("Olion tiedot:");
        outputInfo.setFont(Font.font("Tahoma", FontWeight.BOLD, 16));
        GridPane.setConstraints(outputInfo, 0, 0, 2, 1);
        gridPaneBottom.getChildren().add(outputInfo);
        
        Label objectNameLbl = new Label("Tuote:");
        TextField objectProductName = new TextField();
        objectProductName.setPrefColumnCount(25);
        objectProductName.setEditable(false);
        GridPane.setConstraints(objectNameLbl, 0, 1);
        GridPane.setConstraints(objectProductName, 1, 1);
        gridPaneBottom.getChildren().addAll(objectNameLbl, objectProductName);
        
        Label objectTypeLbl = new Label("Tuotetyyppi:");
        TextField objectProductType = new TextField();
        objectProductType.setPrefColumnCount(25);
        objectProductType.setEditable(false);
        GridPane.setConstraints(objectTypeLbl, 0, 2);
        GridPane.setConstraints(objectProductType, 1, 2);
        gridPaneBottom.getChildren().addAll(objectTypeLbl, objectProductType);
        
        Label objectDateLbl = new Label("Käyttöönottopäivä:");
        TextField objectDate = new TextField();
        objectDate.setPrefColumnCount(25);
        objectDate.setEditable(false);
        GridPane.setConstraints(objectDateLbl, 0, 3);
        GridPane.setConstraints(objectDate, 1, 3);
        gridPaneBottom.getChildren().addAll(objectDateLbl, objectDate);
        
        Label objectPriceLbl = new Label("Myyntihinta:");
        TextField objectPrice = new TextField();
        objectPrice.setPrefColumnCount(25);
        objectPrice.setEditable(false);
        GridPane.setConstraints(objectPriceLbl, 0, 4);
        GridPane.setConstraints(objectPrice, 1, 4);
        gridPaneBottom.getChildren().addAll(objectPriceLbl, objectPrice);
        
        Label objectBuyerLbl = new Label("Ostaja:");
        TextField objectBuyer = new TextField();
        objectBuyer.setPrefColumnCount(25);
        objectBuyer.setEditable(false);
        GridPane.setConstraints(objectBuyerLbl, 0, 5);
        GridPane.setConstraints(objectBuyer, 1, 5);
        gridPaneBottom.getChildren().addAll(objectBuyerLbl, objectBuyer);
        
        
        /* Change listeners */
        
        productName.textProperty().addListener((observable, oldValue, newValue) -> {
            product.setName(newValue);
            objectProductName.setText(product.getName());
        });
        
        productTypes.valueProperty().addListener((observable, oldValue, newValue) -> {
            if (!newValue.toString().equals("Valitse")) {
                product.setType(newValue.toString());
                objectProductType.setText(product.getType());
            }
        });
        
        date.valueProperty().addListener((observable, oldValue, newValue) -> {
            // set date in the format "dd.mm.yyyy"
            product.setDate(newValue.format(formatter));
            objectDate.setText(product.getDate());
        });
        
        price.textProperty().addListener((observable, oldValue, newValue) -> {
            try {
               product.setPrice(Double.parseDouble(newValue)); 
               objectPrice.setText(Double.toString(product.getPrice()));
            }
            catch (NullPointerException npe) { // empty field
                product.setPrice(0.0);
                objectPrice.setText("");
            }
            catch (NumberFormatException nfe) { // invalid double entered
                product.setPrice(0.0);
                objectPrice.setText("");
            }
        });
        
        buyer.textProperty().addListener((observable, oldValue, newValue) -> {
            product.setBuyer(newValue);
            objectBuyer.setText(product.getBuyer());
        });
        
        /* Action listeners for the buttons */
        
        closeBtn.setOnAction(e -> System.exit(0));
        saveBtn.setOnAction(e -> {
            int flag = this.checkData();
            
            if (flag == -1) { // no errors in inputs
                System.exit(0);
            }
            else {
                this.showErrorMessage(flag);
            }
        });
        
        /* The main pane */
        BorderPane borderPane = new BorderPane();
        borderPane.setTop(gridPaneTop);
        borderPane.setBottom(gridPaneBottom);
        
        Scene scene = new Scene(borderPane);
        primaryStage.setScene(scene);
        
        primaryStage.setTitle("Verkkokauppa");
        primaryStage.show();
    }
    
    public int checkData() {
        if (productName.getText().equals("")) {
            return 0;
        }
        if (productTypes.getValue().toString().equals("Valitse")) {
            return 1;
        }
        if (date.getValue() == null) {
            return 2;
        }
        if (price.getText().equals("")) {
            return 3;
        }
        if (buyer.getText().equals("")) {
            return 4;
        }
        
        return -1; // no errors
    }
    
    public void showErrorMessage(int flag) {
        Alert alert = new Alert(Alert.AlertType.ERROR);
        
        switch (flag) {
            case 0:
               alert.setContentText("Anna tuotteen nimi");
               break;
            case 1:
               alert.setContentText("Valitse tuotteen tyyppi");
               break;
            case 2:
               alert.setContentText("Anna tuotteen käyttöönottopäivä");
               break;
            case 3:
               alert.setContentText("Anna tuotteen hinta");
               break;
            case 4:
               alert.setContentText("Anna tuotteen ostaja");
               break;
        }
        
        alert.showAndWait();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
    
}
