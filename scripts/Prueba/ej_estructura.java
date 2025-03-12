package Prueba;

import java.util.Scanner;

public class ej_estructura {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int numero;
        do{
            System.out.println("Por favor ingrese un número entero no negativo");
            numero = sc.nextInt();
            if(numero < 0){
                System.out.println("El número ingresado es negativo, por favor ingrese un número entero no negativo");
            }
        }while(numero < 0);
        long rFactorial = 1;
        int contador = 1;
        while (contador <= numero) {
            rFactorial = rFactorial * contador;
            contador++;
        }
        System.out.println("El resultado factorial del " + numero + " es: " + rFactorial);

    }
}