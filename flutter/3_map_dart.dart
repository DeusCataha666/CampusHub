void main() {
  
  final Map<String, dynamic> pokemon ={
    'name': 'pikachu',
    'hp': 200,
    'isLive': true,
    'abilities': <String>['Impostor'],
    'sprites':{
      1: 'pikachu/front.png',
      2: 'pikachu/back.png'
    }
  };//Map es un tipo de dato que almacena objetos
  
  
  print(pokemon);
  print('name: ${pokemon['name']}');
  print('sprites: ${pokemon['sprites']}');//acceder a un objeto
  
  print('back: ${pokemon['sprites'][2]}');//acceder a un valor especifico de un objeto
  print('front: ${pokemon['sprites'][1]}');
  
}
