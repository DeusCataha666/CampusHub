import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'calendar_screen.dart';
import 'notification_service.dart';

// Modelo de Tarea
class Task {
  String title;
  String description;
  bool isCompleted;
  DateTime date;

  Task({required this.title, required this.description, this.isCompleted = false, required this.date});
}

// Gestión de Datos de Tareas
class TaskData extends ChangeNotifier {
  final List<Task> _tasks = [];

  List<Task> get tasks => _tasks;

  void addTask(String title, String description, DateTime date) {
    final task = Task(title: title, description: description, date: date);
    _tasks.add(task);
    notifyListeners();
  }

  void updateTask(Task task) {
    task.isCompleted = !task.isCompleted;
    notifyListeners();
  }

  void deleteTask(Task task) {
    _tasks.remove(task);
    notifyListeners();
  }
}

// Pantalla de Lista de Tareas
class TaskListScreen extends StatelessWidget {
  const TaskListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Tasks'),
        actions: [
          IconButton(
            icon: Icon(Icons.calendar_today),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => CalendarScreen()),
              );
            },
          ),
        ],
      ),
      body: Consumer<TaskData>(
        builder: (context, taskData, child) {
          return ListView.builder(
            itemCount: taskData.tasks.length,
            itemBuilder: (context, index) {
              return TaskCard(task: taskData.tasks[index]);
            },
          );
        },
      ),
    );
  }
}

// Pantalla de Detalle de Tarea
class TaskDetailScreen extends StatelessWidget {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final DateTime selectedDay;
  final NotificationService notificationService = NotificationService();

  TaskDetailScreen({super.key, required this.selectedDay});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Task'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            TextField(
              controller: descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                Provider.of<TaskData>(context, listen: false).addTask(
                  titleController.text,
                  descriptionController.text,
                  selectedDay,
                );
                await notificationService.scheduleNotification(
                  titleController.text,
                  descriptionController.text,
                  selectedDay.add(Duration(hours: 9)), // Ejemplo: notificación a las 9 AM del día seleccionado
                );
                Navigator.pop(context);
              },
              child: Text('Add Task'),
            ),
          ],
        ),
      ),
    );
  }
}

// Widget de Tarjeta de Tarea
class TaskCard extends StatelessWidget {
  final Task task;

  const TaskCard({super.key, required this.task});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(task.title),
        subtitle: Text(task.description),
        trailing: Checkbox(
          value: task.isCompleted,
          onChanged: (value) {
            Provider.of<TaskData>(context, listen: false).updateTask(task);
          },
        ),
        onLongPress: () {
          Provider.of<TaskData>(context, listen: false).deleteTask(task);
        },
      ),
    );
  }
}

// Punto de Entrada Principal
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => TaskData(),
      child: MaterialApp(
        title: 'Tweek-like App',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        debugShowCheckedModeBanner: false, // Deshabilitar el banner de depuración
        home: TaskListScreen(), // Pantalla de Lista de Tareas
      ),
    );
  }
}