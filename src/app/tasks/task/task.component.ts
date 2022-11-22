import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageTodoService } from './../../shared/manage-todo.service';
import { Todo } from './../../shared/todo.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() todo!: Todo;

  constructor(private todoService: ManageTodoService, private router: Router) { }

  ngOnInit(): void {
  }

  onDeleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo);
  }

  onSetIsEditMode(){
    this.todoService.isEditMode.next(true);
    this.todoService.currentTodo.next(this.todo);
    this.router.navigate(['/new']);
  }


}
