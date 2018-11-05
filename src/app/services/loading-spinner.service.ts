import { Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class LoadingSpinnerService {

  public spinnerStatus: EventEmitter<Boolean>;
  spinCounter = 0;

  constructor() {
    this.spinnerStatus = new EventEmitter();
  }

  show() {
    this.spinCounter++;
    this.spinnerStatus.emit(true);
  }

  hide() {
    this.spinCounter--;
    if (this.spinCounter <= 0) {
      this.spinnerStatus.emit(false);
    }
  }

}
