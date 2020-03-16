import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable, from } from 'rxjs';
import { ToDo } from '../models/to-do';

const TO_DO_DB_NAME = 'toDoDB';
export const TO_DOS_STORE_NAME = 'ToDos';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private toDoDB;
  private loaded = false;

  constructor() { }

  public async connect(): Promise<void> {
    openDB(TO_DO_DB_NAME, 2, {
      upgrade(db) {
        db.createObjectStore(TO_DOS_STORE_NAME, {keyPath: 'id', autoIncrement: true});
      },
    }).then(db => {
        this.toDoDB = db;
        this.loaded = true;
    });
  }

  getAll(storeName: string): Observable<any> {
    if (this.toDoDB === undefined) {
      return from([]);
    }
    console.log(this.toDoDB);
    return from(this.toDoDB.getAll(storeName));
  }

  save(storeName: string, item: any): Observable<any> {
    return from(this.toDoDB.put(storeName, item));
  }
}
