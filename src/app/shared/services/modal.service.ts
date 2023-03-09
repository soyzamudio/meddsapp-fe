import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';
import { Modal } from '../classes/modal';
import { ModalRef } from '../classes/modal-ref';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalContainer: HTMLElement;
  private modalContainerFactory: ComponentFactory<ModalComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {
    this.setupModalContainerFactory();
  }

  open<T extends Modal>(component: Type<T>, inputs?: any): ModalRef {
    this.setupModalContainerDiv();

    const modalContainerRef = this.appRef.bootstrap(
      this.modalContainerFactory,
      this.modalContainer
    );

    const modalComponentRef = modalContainerRef.instance.createModal(component);

    if (inputs) {
      modalComponentRef.instance.onInjectInputs(inputs);
    }

    const modalRef = new ModalRef(modalContainerRef, modalComponentRef);

    return modalRef;
  }

  private setupModalContainerDiv(): void {
    this.modalContainer = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(this.modalContainer);
  }

  private setupModalContainerFactory(): void {
    this.modalContainerFactory =
      this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
  }
}
