import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, interval, Subscription } from 'rxjs';
import { ManageTodoService } from '../../tasks/services/services/manage-todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy{

  constructor(private todoService: ManageTodoService) { }

  searchTermObs = new Subscription();
  searchTerm: FormGroup = new FormGroup({searchTermInput: new FormControl()});

  onSearchTerm(): void{
    this.searchTermObs = this.searchTerm.valueChanges.pipe(debounce(() => interval(300))).subscribe((data) => {
      this.todoService.searchTerm(data.searchTermInput);
    })
  }

  ngOnDestroy(): void {
      this.searchTermObs.unsubscribe();
  }

}
