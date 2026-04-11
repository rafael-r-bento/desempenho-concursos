import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ExamService } from 'src/app/services/exam-service';
import { Exam } from 'src/app/models/exam';
import { AddExamDialog } from 'src/app/components/add-exam-dialog/add-exam-dialog';
import { EditExamDialog } from 'src/app/components/edit-exam-dialog/edit-exam-dialog';
import { DeleteExamDialog } from 'src/app/components/delete-exam-dialog/delete-exam-dialog';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart implements OnInit {
  readonly dialog = inject(MatDialog);
  private examService = inject(ExamService);
  exams: Exam[] = [];
  barChartData = signal<ChartConfiguration<'bar'>['data']>({
    datasets: []
  });

  barChartOptions = signal<ChartConfiguration<'bar'>['options']>({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  });

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.examService.getExams().subscribe((response) => {
      this.exams = response;
      this.barChartData.set({
        labels: this.exams.map(exam => exam.name),
        datasets: [
          {
            label: 'Anuladas',
            data: this.countByQuestionStatus("nulo"),
            backgroundColor: '#000000',
            stack: 'provas'
          },
          {
            label: 'Não respondidas',
            data: this.countByQuestionStatus("erro"),
            backgroundColor: '#FF0000',
            stack: 'provas'
          },
          {
            label: 'Investigação',
            data: this.countByQuestionStatus("duvida"),
            backgroundColor: '#FFFF00',
            stack: 'provas'
          },
          {
            data: this.countByQuestionStatus("acerto"),
            label: 'Respondidas',
            backgroundColor: '#008000',
            stack: 'provas'
          }
        ]
      });
    });
  }

  countByQuestionStatus(questionStatus: String): number[] {
    return this.exams.map(exam =>
      exam.questions.filter(q => q.status === questionStatus).length
    );
  }

  getAllExamNames(): string[] {
    return this.exams.map(exam =>
      exam.name
    );
  }

  openAddExamDialog(): void {
    const dialogRef = this.dialog.open(AddExamDialog, {
      width: '480px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add exam dialog was closed');
      if (result) {
        this.initChart();
      }
    });
  }

  openEditExamDialog(): void {
    const dialogRef = this.dialog.open(EditExamDialog, {
      data: this.exams,
      width: '480px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit exam dialog was closed');
      if (result) {
        this.initChart();
      }
    });
  }

  openDeleteExamDialog(): void {
    const dialogRef = this.dialog.open(DeleteExamDialog, {
      data: this.getAllExamNames(),
      width: '480px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete exam dialog was closed');
      if (result) {
        this.initChart();
      }
    });
  }
}
