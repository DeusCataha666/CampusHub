import java.util.Scanner;

public class control {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Escriba un valor entero");
        int opcion = sc.nextInt();
        switch (opcion) {
            case 1:
                System.out.println("haz seleccionado la opcion 1");
                break;
            case 2:
                System.out.println("haz seleccionado la opcion 2");
                break;
            case 3:
                System.out.println("haz seleccionado la opcion 3");
                break;  
        
            default:
                System.out.println("opcion no valida");
                break;
        }
    }
}
 