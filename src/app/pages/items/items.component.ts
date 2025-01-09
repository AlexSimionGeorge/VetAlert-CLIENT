import {Component, OnInit} from '@angular/core';
import {ItemRequests} from "../ requests/Item.requests";
import {Observable} from "rxjs";
import {Item} from "../models/Item.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {PopUpFormComponent} from "../owners/pop-up-form/pop-up-form.component";
import {FormPopUpComponent} from "./form-pop-up/form-pop-up.component";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButton,
    NgForOf,
    NgIf,
    PopUpFormComponent,
    FormPopUpComponent
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {
  items!: Observable<Item[]>;
  isModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedItem: any = null;

  constructor(private itemRequests: ItemRequests) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.itemRequests.getItems();
  }

  openModal(mode: 'create' | 'edit', item: any = null) {
    this.isModalOpen = true;
    this.modalMode = mode;
    this.selectedItem = item;
  }

  closeModal() {
    this.isModalOpen = false;
    this.loadItems();
  }


  deleteOwner(itemId: string) {
    this.itemRequests.deleteItem(itemId).subscribe({
      next: (delresp) => {
        this.loadItems();
      },
      error: (error: any) => {
        console.error('Error deleting animal:', error);
      },
    });
  }
}
