import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

export interface User {
  name: string;
  age: number;
  ageUnit: string;
  isStudent: boolean;
  school?: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CardComponent {
  @Input() user!: User;
}
