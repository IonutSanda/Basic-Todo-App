import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../services/models/todo.model';
import { ManageTodoService } from '../services/services/manage-todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() todo!: Todo;

  constructor(private todoService: ManageTodoService, private router: Router) { }


  onDoneTodo(todo: Todo):void{
    const statusUpdate = {...todo, status: 'closed'};
    this.todoService.updateTodo(todo, statusUpdate);
  }

  onDeleteTodo(todo: Todo):void{
    this.todoService.deleteTodo(todo).subscribe();
  }

  onReOpenTodo(todo: Todo):void{
    const statusUpdate = {...todo, status: 'open'};
    this.todoService.updateTodo(todo, statusUpdate);
  }

  onSetIsEditMode():void{
    this.todoService.setIsEditMode(true);
    this.todoService.setCurrentTodo(this.todo);
    this.router.navigate(['/new']);
  }

}
