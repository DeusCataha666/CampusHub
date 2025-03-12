import java.util.Scanner;

public class consumo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Ingrese el consumo de electricidad en kWh");
        int consumo = scanner.nextInt();
        double tarifa;
        if (consumo <= 100) {
            tarifa = consumo * 0.50;
        } else if (consumo <= 200) {
            tarifa = consumo * 0.70;
        } else if (consumo <= 500) {
            tarifa = consumo * 1.20;
        } else {
            tarifa = consumo * 1.50;
        }
        System.out.println("El costo total a pagar es: $" + tarifa);
        
    }
}