import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  CollectionReference,
  Query,
  query,
  where,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ProductsI } from './models/products.models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Sesión cerrada correctamente.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  getCollectionChanges<ProductsI>(
    path: string,
    field?: string,
    condition?: any,
    value?: any
  ): Observable<ProductsI[]> {
    const refCollection = collection(
      this.firestore,
      path
    ) as CollectionReference<ProductsI>;

    let q: Query<ProductsI> = refCollection; // Aseguramos que es un Query<T>

    if (field && condition && value) {
      q = query(refCollection, where(field, condition, value));
    }

    return collectionData(q) as Observable<ProductsI[]>; // Se pasa como Query<T>
  }
}
