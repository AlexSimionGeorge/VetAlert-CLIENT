import { Component } from '@angular/core';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  standalone: true,
  imports: [
    JsonPipe
  ],
})
export class AnimalsComponent {
}
