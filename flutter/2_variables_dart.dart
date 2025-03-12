void main() {
  // final es una variable que no se puede modificar
  final String pokemon = 'Picachu'; //string es un tipo de dato que almacena texto
  final int numeros = 1; //int es un tipo de dato que almacena numeros enteros
  final bool expre = true;//bool es un tipo de dato que almacena valores booleanos
  final List<String> habilidades =['rayos', 'ataque relampago', 'relampagos'];//List es un tipo de dato que almacena listas
  final debilidades = <String>['tierra', 'ataques de agua'];//esta es otra forma de declarar una lista

  dynamic errorMensaje = 'hola';//dynamic es un tipo de dato que puede almacenar cualquier tipo de dato
  errorMensaje = 1;
  errorMensaje = true;
  errorMensaje = ['hola', 'mundo'];
  errorMensaje = <String>['hola', 'mundo'];
  errorMensaje = <int>[1, 2, 3];
  errorMensaje = <bool>[true, false, true];
  errorMensaje = <dynamic>[1, 'hola', true];
  errorMensaje = <dynamic>[1, 'hola', true, <String>['hola', 'mundo']];
  
  print ("""
  $pokemon
  $numeros
  $expre
  $habilidades
  $debilidades
  
  """);//el triple comilla sirve para imprimir varias lineas de texto
  
}