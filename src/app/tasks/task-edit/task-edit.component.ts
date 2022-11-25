import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageTodoService } from '../services/services/manage-todo.service';
import { Todo } from '../services/models/todo.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  todoForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });
  currentTodo!: Todo;
  isEditmode!: boolean;
  titleInput: string = '';
  descInput: string = '';

  constructor(private todoService: ManageTodoService, private router: Router) { }

  ngOnInit(): void {
    this.currentTodo = this.todoService.getCurrentTodo();
    this.initForm();
  }
  
  onSubmit():void{
    if(this.isEditmode){
      this.todoService.updateTodo(this.currentTodo, {...this.todoForm.value, status: this.currentTodo.status});     
      this.todoService.getTodos(); 
    } else {
      this.todoService.addTodo(this.todoForm.value);      
      this.todoService.getTodos(); 
    }
    this.todoService.setIsEditMode(false);
    this.onResetForm();
    this.router.navigate(['/open']);
  }
  
  onResetForm():void{
    this.todoForm.reset();
  }
  
  private initForm():void{
    this.todoService.isEditModeObs.subscribe(bool => this.isEditmode = bool);
   
    if(this.isEditmode){
      this.currentTodo = this.todoService.getCurrentTodo();
      this.todoForm.get('name')?.setValue(this.currentTodo.name);
      this.todoForm.get('description')?.setValue(this.currentTodo.description);
    }     
  }

}
