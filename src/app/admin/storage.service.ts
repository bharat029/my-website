import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  StorageReference,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private resumeRef: StorageReference;
  private profileImageRef: StorageReference;

  constructor(private storage: Storage) {
    this.resumeRef = ref(this.storage, 'files/bharathan-mudaliar-resume.pdf');
    this.profileImageRef = ref(this.storage, 'images/bharathan-mudaliar.jpg');
  }

  async uploadResume(resume: File) {
    const res = await uploadBytes(this.resumeRef, resume);
    return await getDownloadURL(res.ref);
  }

  async uploadProfileImage(profileImage: File) {
    const res = await uploadBytes(this.profileImageRef, profileImage);
    return await getDownloadURL(res.ref);
  }
}
