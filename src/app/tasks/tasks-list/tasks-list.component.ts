import { ManageTodoService } from './../../shared/manage-todo.service';
import { Todo } from './../../shared/todo.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: ManageTodoService) { }

  ngOnInit(): void {
    this.todoService.todoSub.subscribe((todos) => {
      this.todos = todos;
    })
    this.todos = this.todoService.getTodos();
  }


}
