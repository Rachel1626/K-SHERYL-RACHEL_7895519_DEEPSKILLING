import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

function noCourseCode(control: AbstractControl): ValidationErrors | null {
  if (control.value && String(control.value).startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (control.value && control.value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheck]],
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  // Using a typed getter is better than casting in the template because:
  // 1. It provides compile-time type safety
  // 2. It keeps the template clean without type casting
  // 3. It's reusable across the template
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // enrollForm.value excludes disabled controls, while
  // enrollForm.getRawValue() includes all controls regardless of disabled state
  onSubmit(): void {
    console.log('Form value:', this.enrollForm.value);
    console.log('Form raw value:', this.enrollForm.getRawValue());
    if (this.enrollForm.valid) {
      this.submitted = true;
    }
  }

  resetForm(): void {
    this.enrollForm.reset({ preferredSemester: 'Odd', agreeToTerms: false });
    this.additionalCourses.clear();
    this.submitted = false;
  }
}
