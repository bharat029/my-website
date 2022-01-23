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
    // return collectionData(collection(this.db, 'users')).pipe(
    //   map((docs) => docs[0] as RootStateModel)
    // );
    addDoc(collection(this.db, 'users'), JSON.parse(localStorage.getItem('data')!)).then(() => console.log('done'));
  }
}
