import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  submitted = signal(false);

  contactForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Accesos directos para el template
  get nombre() {
    return this.contactForm.controls['nombre'];
  }

  get email() {
    return this.contactForm.controls['email'];
  }

  get asunto() {
    return this.contactForm.controls['asunto'];
  }

  get mensaje() {
    return this.contactForm.controls['mensaje'];
  }

  onSubmit() {

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Formulario enviado:', this.contactForm.value);
    this.submitted.set(true);
    this.contactForm.reset();
  }
}
