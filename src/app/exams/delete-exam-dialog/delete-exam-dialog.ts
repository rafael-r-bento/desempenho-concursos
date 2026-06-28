import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExamService } from 'src/app/exams/exam-service';

@Component({
  selector: 'app-delete-exam-dialog',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './delete-exam-dialog.html',
  styleUrl: './delete-exam-dialog.css',
})
export class DeleteExamDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteExamDialog>);
  private examService = inject(ExamService);
  examNameList = signal(inject<string[]>(MAT_DIALOG_DATA));

  examForm = new FormGroup(
    {
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
    }
  );

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    if (this.examForm.invalid) {
      this.examForm.markAllAsTouched();
      return;
    }

    const dto = {
      name: this.examForm.controls.name.value,
    };

    this.examService.deleteExam(dto).subscribe((response) => {
      console.log(response.message);
      this.dialogRef.close(true);
    });
  }
}
