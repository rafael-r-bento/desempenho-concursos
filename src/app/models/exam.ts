export interface Exam {
  name: string;
  date: string;
  questions: Question[];
}

export interface Question {
  id: number;
  answer: string;
  status: string;
}
