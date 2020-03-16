import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/models/to-do';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  @Input() toDo: ToDo;
  @Output() toDoToggleEvent = new EventEmitter<ToDo>();

  constructor() { }

  ngOnInit(): void {
  }

  changeCheckbox(): void {
    this.toDoToggleEvent.emit(this.toDo);
  }
}
