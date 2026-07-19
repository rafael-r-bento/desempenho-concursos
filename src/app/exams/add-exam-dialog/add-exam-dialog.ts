import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExamService } from 'src/app/exams/exam-service';

@Component({
  selector: 'app-add-exam-dialog',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-exam-dialog.html',
  styleUrl: './add-exam-dialog.css',
})
export class AddExamDialog {
  readonly dialogRef = inject(MatDialogRef<AddExamDialog>);
  private examService = inject(ExamService);

  examForm = new FormGroup(
    {
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      date: new FormControl<Date | null>(null, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      numberOfQuestions: new FormControl<number>(120, {
        nonNullable: true,
        validators: [Validators.required]
      })
    }
  );

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.examForm.invalid) {
      this.examForm.markAllAsTouched();
      return;
    }

    const dto = {
      name: this.examForm.controls.name.value,
      date: this.examForm.controls.date.value,
      questions: this.examForm.controls.numberOfQuestions.value
    };

    this.examService.addExam(dto).subscribe((response) => {
      console.log(response.message);
      this.dialogRef.close(true);
    });
  }
}
