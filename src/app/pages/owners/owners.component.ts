import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {OwnerModel} from "../models/Owner.model";
import {OwnerRequests} from "../ requests/Owner.requests";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {FormPopUpComponent} from "../animals/form-pop-up/form-pop-up.component";
import {PopUpFormComponent} from "./pop-up-form/pop-up-form.component";

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatButton,
    FormPopUpComponent,
    NgIf,
    PopUpFormComponent
  ],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent implements OnInit {
  owners!: Observable<OwnerModel[]>;
  isModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedOwner: any = null;
  constructor(private ownerRequests: OwnerRequests) {}

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners(): void {
    this.owners = this.ownerRequests.getOwners();
  }

  openModal(mode: 'create' | 'edit', owner: any = null) {
    this.isModalOpen = true;
    this.modalMode = mode;
    this.selectedOwner = owner;
  }

  closeModal() {
    this.isModalOpen = false;
    this.loadOwners();
  }

  deleteOwner(ownerId: string): void {
    this.ownerRequests.deleteOwner(ownerId).subscribe({
      next: (delresp) => {
        this.loadOwners();
      },
      error: (error: any) => {
        console.error('Error deleting animal:', error);
      },
    });
  }
}
