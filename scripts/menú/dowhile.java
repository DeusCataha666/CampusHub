package menú;
import java.util.Scanner;
import javax.swing.JOptionPane;

public class dowhile {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean salir = false;
        int opt = -1;
        do {
            String menu = "######## Menu ########\n"
                        + "1. Capturar Entero\n"
                        + "2. Capturar Cadena\n"
                        + "3. Capturar long\n"
                        + "4. Capturar double\n"
                        + "5. Salir\n"
                        + "######################";
            String input = JOptionPane.showInputDialog(menu);
            opt = Integer.parseInt(input);
            switch (opt) {
                case 1:
                    String numStr = JOptionPane.showInputDialog("Escriba un numero entero: ");
                    int num = Integer.parseInt(numStr);
                    JOptionPane.showMessageDialog(null, "El numero entero es: " + num);
                    break;
                case 2:
                    String cadena = JOptionPane.showInputDialog("Escriba una cadena: ");
                    JOptionPane.showMessageDialog(null, "La cadena es: " + cadena);
                    break;
                case 3:
                    String numLongStr = JOptionPane.showInputDialog("Escriba un numero long: ");
                    long numLong = Long.parseLong(numLongStr);
                    JOptionPane.showMessageDialog(null, "El numero long es: " + numLong);
                    break;
                case 4:
                    String numDoubleStr = JOptionPane.showInputDialog("Escriba un numero double: ");
                    double numDouble = Double.parseDouble(numDoubleStr);
                    JOptionPane.showMessageDialog(null, "El numero double es: " + numDouble);
                    break;
                default:
                    salir = true;
            }              
        }while (salir == false); //Guardaremos la opcion del usuario
    }
}
