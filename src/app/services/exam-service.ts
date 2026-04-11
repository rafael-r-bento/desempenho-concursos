import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exam } from 'src/app/models/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private http = inject(HttpClient);

  getExams() {
    return this.http.get<Exam[]>('/api/exams');
  }

  addExam(request: { name: string; questions: number }) {
    return this.http.post<{message: string}>('/api/exams', request);
  }

  setExam(request: Exam) {
    return this.http.patch<{message: string}>('/api/exams', request);
  }

  deleteExam(request: { name: string }) {
    return this.http.delete<{message: string}>('/api/exams', {
      body: request
    });
  }
}
