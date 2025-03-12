import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:timezone/data/latest.dart' as tz;
import 'package:timezone/timezone.dart' as tz;

void main() {
  runApp(const HeartCareApp());
}

class HeartCareApp extends StatelessWidget {
  const HeartCareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.red),
      home: const HeartCareHome(),
    );
  }
}

class HeartCareHome extends StatefulWidget {
  const HeartCareHome({super.key});

  @override
  HeartCareHomeState createState() => HeartCareHomeState();
}

// aqui se crean las variables que se van a mostrar en la pantalla

//esta es la clase que se encarga de mostrar los datos en la pantalla como lo son los datos del paciente, medicamentos, citas, etc.
class HeartCareHomeState extends State<HeartCareHome> {
  // Datos simulados
  int heartRate = 72;
  String bloodPressure = "120/80";
  int steps = 8467;
  List<Map<String, dynamic>> medications = [
    {'name': 'Aspirina 100mg', 'time': '8:00 AM'},
    {'name': 'Enalapril 10mg', 'time': '2:00 PM'},
  ];
  String doctorName = "Dr. González";
  String appointmentDate = "Mar 15";

  // Notificaciones locales
  FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  @override
  void initState() {
    super.initState();
    tz.initializeTimeZones();
    _initializeNotifications();
    _scheduleMedicationsNotifications();
  }

  void _initializeNotifications() {
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const InitializationSettings initializationSettings =
        InitializationSettings(android: initializationSettingsAndroid);
    flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  void _scheduleMedicationsNotifications() {
    for (var med in medications) {
      _scheduleNotification(med['name'], med['time']);
    }
  }

  void _scheduleNotification(String title, String time) {
    try {
      final now = DateTime.now();
      final parts = time.split(':');
      final hour = int.parse(parts[0]);
      final minute = int.parse(parts[1].split(' ')[0]);
      final isPM = time.contains('PM');
      final notificationTime = DateTime(
        now.year,
        now.month,
        now.day,
        isPM ? hour + 12 : hour,
        minute,
      );

      flutterLocalNotificationsPlugin.zonedSchedule(
        title.hashCode,
        'Recordatorio de Medicamento',
        '$title a las $time',
        tz.TZDateTime.from(notificationTime, tz.local),
        const NotificationDetails(
          android: AndroidNotificationDetails(
            'medication_channel',
            'Medicamentos',
            channelDescription: 'Recordatorios para tomar medicamentos',
            importance: Importance.high,
          ),
        ),
        androidScheduleMode: AndroidScheduleMode.exactAllowWhileIdle,
        uiLocalNotificationDateInterpretation:
            UILocalNotificationDateInterpretation.absoluteTime,
      );
    } catch (e) {
      print('Error al programar la notificación: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              "HeartCare",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.red),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              _buildMainPanel(),
              const SizedBox(height: 16),
              _buildMedicationsSection(),
              const SizedBox(height: 16),
              _buildAppointmentSection(),
              const SizedBox(height: 16),
              _buildStatsSection(),
            ],
          ),
        ),
      ),
    );
  }

  // wiget que se encarga de mostrar los datos del paciente en la pantalla
  Widget _buildMainPanel() {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildMetric("Ritmo Cardíaco", heartRate.toString(), Icons.favorite),
            const Divider(),
            _buildMetric("Presión Arterial", bloodPressure, Icons.local_hospital),
            const Divider(),
            _buildMetric("Pasos", steps.toString(), Icons.directions_walk),
          ],
        ),
      ),
    );
  }

  // da estilo a los datos del paciente 
  Widget _buildMetric(String label, String value, IconData icon) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Icon(icon, color: Colors.red),
            const SizedBox(width: 8),
            Text(label, style: const TextStyle(fontSize: 16)),
          ],
        ),
        Text(
          value,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildMedicationsSection() {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Próximos Medicamentos",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Column(
              children: medications.map((med) {
                return ListTile(
                  leading: const Icon(Icons.alarm, color: Colors.red),
                  title: Text(med['name']),
                  trailing: Text(med['time'], style: const TextStyle(color: Colors.grey)),
                );
              }).toList(),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildAppointmentSection() {
    return Card(
      elevation: 4,
      child: ListTile(
        leading: const Icon(Icons.calendar_today, color: Colors.red),
        title: const Text("Próxima Cita"),
        subtitle: Text(doctorName),
        trailing: Text(
          appointmentDate,
          style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  Widget _buildStatsSection() {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Estadísticas",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 200,
              child: LineChart(
                LineChartData(
                  lineBarsData: [
                    LineChartBarData(
                      spots: const [
                        FlSpot(0, 70),
                        FlSpot(1, 75),
                        FlSpot(2, 72),
                        FlSpot(3, 80),
                        FlSpot(4, 65),
                      ],
                      isCurved: true,
                      color: Colors.red,
                      dotData: FlDotData(show: false),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}