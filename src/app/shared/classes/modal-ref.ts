import { ComponentRef } from  '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';

import { Modal } from './modal';

export class ModalRef {
  private result$ = new Subject<any>();

  constructor(
    private modalContainer: ComponentRef<ModalComponent>,
    private modal: ComponentRef<Modal>,
  ) {
    this.modal.instance.modalInstance = this;
  }

  close(output: any): void {
    this.result$.next(output);
    this.destroy$();
  }

  dismiss(output: any): void {
    this.result$.error(output);
    this.destroy$();
  }

  onResult(): Observable<any> {
    return this.result$.asObservable();
  }

  private destroy$(): void {
    this.modal.destroy();
    this.modalContainer.destroy();
    this.result$.complete();
  }

}
