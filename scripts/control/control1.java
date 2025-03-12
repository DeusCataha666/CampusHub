import java.util.Scanner;

public class control1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Escriba un valor inicial");
        int valorInicial = sc.nextInt();
        System.out.println("Escriba un valor final");
        int valorFinal = sc.nextInt();
        System.out.println("valor inicial: " + valorInicial);
        for (int i = (valorInicial+1); i < valorFinal; i++) {
            System.out.println(i + ", ");
        }
        System.out.println("");
        System.out.println("valor final: " + valorFinal);
    }
}
