import { Component, OnInit } from '@angular/core';
import { ToDosService } from 'src/app/services/to-dos.service';
import { ToDo } from 'src/app/models/to-do';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  toDos: ToDo[];
  newToDoTitle = '';

  constructor(
    private toDosService: ToDosService,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  toDoToggled(toDo: ToDo): void {
    this.toDosService.toggleToDo(toDo).subscribe(async () => {
      this.refresh();
    });
  }

  addToDo(): void {
    this.toDosService.addToDo(this.newToDoTitle).subscribe(() => {
      this.newToDoTitle = '';
      this.refresh();
    });
    this.newToDoTitle = '';
  }

  editTitle(text) {
    this.newToDoTitle = text;
  }

  refresh() {
    this.toDosService.getToDos().subscribe( toDoList => this.toDos = toDoList);
  }
}
