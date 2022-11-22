import { ManageTodoService } from './../../shared/manage-todo.service';
import { Todo } from './../../shared/todo.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() todo!: Todo;
  // isEditmode: boolean = false;

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
    // const newTodo = 'test';
    // this.todoService.updateTodo(this.todo, newTodo);
  }


}
