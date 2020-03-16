import { Injectable } from '@angular/core';
import { ToDo } from '../models/to-do';
import { Observable } from 'rxjs';
import { PersistenceService, TO_DOS_STORE_NAME } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class ToDosService {


  toDos: ToDo[] = [
    {
      id: 1,
      title: 'Ver una pelicula',
      done: false
    },
    {
      id: 2,
      title: 'Trabajar',
      done: false
    },
    {
      id: 3,
      title: 'Cocinar',
      done: true
    }
  ];

  constructor(private persistenceService: PersistenceService) { }

  getToDos(): Observable<ToDo[]> {
    return this.persistenceService.getAll('ToDos');
  }

  toggleToDo(toDo: ToDo): Observable<void> {
    return this.persistenceService.save(TO_DOS_STORE_NAME, {
      ...toDo,
      done: !toDo.done
    });
  }

  addToDo(title: string): Observable<void> {
    return this.persistenceService.save(TO_DOS_STORE_NAME, {
      title,
      done: false
    });
  }
}
