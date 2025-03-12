package Prueba;

import java.util.Scanner;
import java.util.Random;

public class ej_estructura3 {
    public static void main(String[] args) {
        Scanner w = new Scanner(System.in);
        Random r = new Random();
        int numero = r.nextInt(100) + 1;
        int intentos;
        int cantidadIntentos = 0;
        do {
            System.out.println("Por favor ingrese un número entero con el cual va a jugar");
            intentos = w.nextInt();
            cantidadIntentos++;
            if (numero > intentos) {
                System.out.println("El número ingresado es mayor al número a adivinar");
            } else if (numero < intentos) {
                System.out.println("El número ingresado es menor al número a adivinar");
            } else {
                System.out.println("¡Felicidades! Has adivinado el número en " + cantidadIntentos + " intentos");
            }
        } while (numero != intentos);
        switch (cantidadIntentos) {
            case 1:
                System.out.println("¡Increible suerte! Has adivinado el número en un solo intento");
                break;
            case 2:
                System.out.println("¡Excelente! Has adivinado el número en dos intentos");
                break;
            case 3:
                System.out.println("¡Muy bien! Has adivinado el número en tres intentos");
                break;
            case 4:
                System.out.println("¡Bien! Has adivinado el número en cuatro intentos");
                break;
            case 5:
                System.out.println("¡Bien! Has adivinado el número en cinco intentos");
                break;
            default:
                System.out.println("Has adivinado el número en " + cantidadIntentos + " intentos");
        }
    }
}