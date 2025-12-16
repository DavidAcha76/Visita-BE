import * as admin from 'firebase-admin';
import { join } from 'path';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({})
export class FirebaseModule {
  static initialize() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          join(process.cwd(), 'src/firebase/dashboard-app-26023-firebase-adminsdk-fbsvc-46ded3bf2a.json'),
        ),
      });
    }
    return admin.firestore();
  }
}
