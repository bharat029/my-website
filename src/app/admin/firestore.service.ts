import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  QueryDocumentSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CVStateModel } from '../store/cv/cv.model';
import { CvState } from '../store/cv/cv.state';
import { UserData } from '../store/root/root.model';

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private docRef!: DocumentReference<UserData>;

  constructor(private store: Store, private db: Firestore) {
    const collectionRef = collection(this.db, 'users').withConverter(
      converter<UserData>()
    );

    getDocs(collectionRef).then((snapshot) => {
      this.docRef = doc(collectionRef, snapshot.docs[0].id);
    });
  }

  async update(data: Partial<UserData>) {
    return await updateDoc(this.docRef, data);
  }

  async updateCV(data: Partial<CVStateModel>) {
    const cv = this.store.selectSnapshot((state) => state.root.cv);
    return await updateDoc(this.docRef, { cv: { ...cv, ...data } });
  }
}
