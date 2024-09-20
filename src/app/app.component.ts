import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent, UserInput } from './input-form/input-form.component';
import { CardComponent, User } from './card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, InputFormComponent, CardComponent]
})
export class AppComponent {
  users: User[] = [];

  addUser(userInput: UserInput) {
    this.users.push(userInput);
  }
}
