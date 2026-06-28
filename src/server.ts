import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { Exam } from 'src/app/exams/exam';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());
const angularApp = new AngularNodeAppEngine();

const fs = require("fs");

app.get('/api/exams', (req, res) => {
  try {
    const exams = JSON.parse(fs.readFileSync("exams.json"));
    res.send(exams);
  } catch(error: unknown) {
    if (error instanceof Error) {
      res.status(500);
      res.send({ message: error.message});
    }
  }
});

app.post('/api/exams', (req, res) => {
  try {
    if (req.body.name && req.body.date) {
      const questions = [];
      const questionsLength = req.body.questions ?? 120;
      for (let i = 0; i < questionsLength; i++) {
        questions.push({
          id: i + 1,
          answer: '',
          status: 'erro'
        });
      }
      const newExam = {
        name: req.body.name,
        date: req.body.date,
        questions: questions
      };
      const exams = JSON.parse(fs.readFileSync("exams.json"));
      const newExamsList = [...exams, newExam].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      fs.writeFileSync("exams.json", JSON.stringify(newExamsList));
      res.status(201);
      res.send({ message: 'Prova inserida com sucesso' });
    } else if (!req.body.name) {
      res.status(422);
      res.send({ message: 'O campo nome é obrigatório' });
    } else {
      res.status(422);
      res.send({ message: 'O campo data é obrigatório' });
    }
  } catch(error: unknown) {
    if (error instanceof Error) {
      res.status(500);
      res.send({ message: error.message });
    }
  }
});

app.patch('/api/exams', (req, res) => {
  try {
    const name = req.body.name;
    if (name) {
      const modifications = req.body;
      const currentExams = JSON.parse(fs.readFileSync("exams.json"));
      const modifiedIndex = currentExams.findIndex((exam: Exam) => exam.name === name);
      const changedExam = { ...currentExams[modifiedIndex], ...modifications};
      currentExams[modifiedIndex] = changedExam;
      fs.writeFileSync("exams.json", JSON.stringify(currentExams));
      res.send({ message: 'Item modificado com sucesso' });
    } else {
      res.status(422);
      res.send({ message: 'Nome inválido' });
    }
  } catch(error: unknown) {
    if (error instanceof Error) {
      res.status(500);
      res.send({ message: error.message});
    }
  }
});

app.delete('/api/exams', (req, res) => {
  try {
    const name = req.body.name;
    if (name) {
      const exams = JSON.parse(fs.readFileSync("exams.json"));
      const filteredExams = exams.filter((exam: Exam) => exam.name !== name);
      fs.writeFileSync("exams.json", JSON.stringify(filteredExams));
      res.send({ message: 'Prova deletada com sucesso' });
    } else {
      res.status(422);
      res.send({ message: 'Nome inválido' });
    }
  } catch(error: unknown) {
    if (error instanceof Error) {
      res.status(500);
      res.send(error.message);
    }
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
