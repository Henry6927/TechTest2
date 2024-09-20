import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface UserInput {
  name: string;
  age: number;
  ageUnit: string;
  isStudent: boolean;
  school?: string;
}

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class InputFormComponent {
  @Output() addUser = new EventEmitter<UserInput>();

  ageUnits = ['Year(s)', 'Month(s)'];
  isStudentOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(125)]],
      ageUnit: ['Year', Validators.required],
      isStudent: [null, Validators.required],
      school: [{ value: '', disabled: true }, [Validators.minLength(1), Validators.maxLength(200)]]
    });

    this.form.get('ageUnit')?.valueChanges.subscribe(value => {
      const ageControl = this.form.get('age');
      if (value === 'Month') {
        ageControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
      } else {
        ageControl?.setValidators([Validators.required, Validators.min(1), Validators.max(125)]);
      }
      ageControl?.updateValueAndValidity();
    });

    this.form.get('isStudent')?.valueChanges.subscribe(value => {
      const schoolControl = this.form.get('school');
      if (value === true) {
        schoolControl?.enable();
      } else {
        schoolControl?.disable();
        schoolControl?.setValue('');
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const userInput: UserInput = {
        name: this.form.value.name!,
        age: Number(this.form.value.age!), 
        ageUnit: this.form.value.ageUnit!,
        isStudent: this.form.value.isStudent!,
        school: this.form.value.school || undefined
      };
      this.addUser.emit(userInput);
      this.form.reset({
        name: '',
        age: '',
        ageUnit: 'Year',
        isStudent: null,
        school: ''
      });
      this.form.get('school')?.disable();
    }
  }
  
}
