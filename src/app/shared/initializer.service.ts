import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore,  } from '@angular/fire/firestore';
import { first, map } from 'rxjs';
import { RootStateModel } from '../store/root/root.model';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  constructor(private db: Firestore) {}

  initialize() {
    // addDoc(collection(this.db, 'users'), JSON.parse(localStorage.getItem('newData')!)).then(() => console.log('done'));
    return collectionData(collection(this.db, 'users')).pipe(
      map((docs) => docs[0] as RootStateModel)
    );
  }
}
