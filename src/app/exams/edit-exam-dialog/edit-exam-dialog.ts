import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormArray,
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
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Exam, Question } from 'src/app/exams/exam';
import { ExamService } from 'src/app/exams/exam-service';

type QuestionForm = FormGroup<{
  id: FormControl<number>;
  answer: FormControl<string>;
  status: FormControl<string>;
}>;

@Component({
  selector: 'app-edit-exam-dialog',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-exam-dialog.html',
  styleUrl: './edit-exam-dialog.css',
})
export class EditExamDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<EditExamDialog>);
  private examService = inject(ExamService);
  exams = signal(inject<Exam[]>(MAT_DIALOG_DATA));
  examNameList = signal(this.getAllExamNames());
  displayedColumns: string[] = ['id', 'answer', 'status'];
  selectedExamDate = "";

  examForm = new FormGroup(
    {
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      questions: new FormArray<QuestionForm>([])
    }
  );

  ngOnInit() {
    this.examForm.controls.name.valueChanges.subscribe(name => {
      const exam = this.exams().find(exam => exam.name === name);
      this.selectedExamDate = exam?.date ?? Date();
      this.loadTable(exam?.questions ?? []);
    });
  }

  get questionsFormArray(): FormArray<QuestionForm> {
    return this.examForm.get('questions') as FormArray<QuestionForm>;
  }

  getAllExamNames(): string[] {
    return this.exams().map(exam =>
      exam.name
    );
  }

  createQuestionForm(question: Question): QuestionForm {
    return new FormGroup({
      id: new FormControl(question.id, { nonNullable: true }),
      answer: new FormControl(question.answer, { nonNullable: true }),
      status: new FormControl(question.status, { nonNullable: true })
    });
  }

  loadTable(questions: Question[]) {
    this.examForm.setControl(
      'questions',
      new FormArray<QuestionForm>(
        questions.map(question => this.createQuestionForm(question))
      )
    );
  }

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
      date: this.selectedExamDate,
      questions: this.questionsFormArray.controls.map(group => ({
        id: group.controls.id.value,
        answer: group.controls.answer.value,
        status: group.controls.status.value
      }))
    };

    this.examService.setExam(dto).subscribe((response) => {
      console.log(response.message);
      this.dialogRef.close(true);
    });
  }
}
