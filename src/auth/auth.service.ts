import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class FirebaseAuthService {
  private firebaseApp: admin.app.App;

  constructor() {
    if (!admin.apps.length) {
      const serviceAccount = JSON.parse(
        fs.readFileSync('./private_key.json', 'utf8'),
      );

      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  async register(email: string, password: string) {
    return this.firebaseApp.auth().createUser({ email, password });
  }

  async verify(idToken: string) {
    return await this.firebaseApp.auth().verifyIdToken(idToken);
  }
}
