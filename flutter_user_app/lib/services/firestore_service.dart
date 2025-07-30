import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/task.dart';

class FirestoreService {
  final _db = FirebaseFirestore.instance;
  final _collection = 'todos';

  Stream<List<Task>> getTasks() {
    return _db.collection(_collection).orderBy('timestamp', descending: true).snapshots().map(
      (snapshot) => snapshot.docs.map((doc) => Task.fromMap(doc.id, doc.data())).toList(),
    );
  }

  Future<void> addTask(String title) async {
    await _db.collection(_collection).add({
      'title': title,
      'isDone': false,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }

  Future<void> deleteTask(String id) async {
    await _db.collection(_collection).doc(id).delete();
  }

  Future<void> toggleDone(String id, bool currentStatus) async {
    await _db.collection(_collection).doc(id).update({'isDone': !currentStatus});
  }
}
