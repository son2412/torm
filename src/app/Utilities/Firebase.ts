import firebase from 'firebase';
export class FirebaseService {
  dbRef: any;
  options: any;
  constructor() {
    this.options = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STRORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGE_SENDER_ID,
      appId: process.env.APP_ID
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(this.options);
    }
    this.dbRef = firebase.database().ref();
  }

  createChildConversation(conversationId: number) {
    const conversationRef = this.dbRef.child('chats');
    conversationRef.child(conversationId).set('');
  }

  createChildMessage(conversationId: number, message: any) {
    const messageRef = this.dbRef.child('chats/' + conversationId);
    messageRef.push(message);
  }
}
