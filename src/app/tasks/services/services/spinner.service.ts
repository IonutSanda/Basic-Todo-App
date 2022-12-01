import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loading = new BehaviorSubject<boolean>(false);
  readonly loadingObs$ = this.loading.asObservable();

  showLoading():void{
    this.loading.next(true);
  }

  hideLoading():void{
    this.loading.next(false)
  }

}
