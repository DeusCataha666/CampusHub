package Prueba;
import java.util.Scanner;

public class ej_estructura2 {
    public static void main(String[] args) {
        Scanner w = new Scanner(System.in);
        System.out.println("Por favor ingrese un número entero mayor a cero(0)");
        int numero = w.nextInt();
        if (numero < 0) {
            System.out.println("El número ingresado debe ser mayor a cero(0)");
        } else {
            for (int i = 1; i <= 10; i++){ 
                int producto = numero * i;
                System.out.println(numero + " * " + i + " = " + producto);
            }
        }
    }
}
