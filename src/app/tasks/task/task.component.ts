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

  onDoneTodo(todo: Todo){
    const statusUpdate = {...todo, status: 'closed'}
    this.todoService.updateTodo(todo, statusUpdate);
  }

  onDeleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo);
  }

  onReOpenTodo(todo: Todo){
    const statusUpdate = {...todo, status: 'open'}
    this.todoService.updateTodo(todo, statusUpdate);
  }

  onSetIsEditMode(){
    this.todoService.setIsEditMode(true)
    this.todoService.setCurrentTodo(this.todo);
    this.router.navigate(['/new']);
  }

}
