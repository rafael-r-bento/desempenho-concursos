import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { provasConcursos, StatusQuestao } from '../questoes.data';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  provasConcursos = provasConcursos;
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.provasConcursos.map(prova => prova.nome),
    datasets: [
      {
        label: 'Anuladas',
        data: this.countByStatusQuestao(StatusQuestao.Nulo),
        backgroundColor: '#000000',
        stack: 'provas'
      },
      {
        label: 'Não respondidas',
        data: this.countByStatusQuestao(StatusQuestao.Erro),
        backgroundColor: '#FF0000',
        stack: 'provas'
      },
      {
        label: 'Investigação',
        data: this.countByStatusQuestao(StatusQuestao.Duvida),
        backgroundColor: '#FFFF00',
        stack: 'provas'
      },
      {
        data: this.countByStatusQuestao(StatusQuestao.Acerto),
        label: 'Respondidas',
        backgroundColor: '#008000',
        stack: 'provas'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  };

  countByStatusQuestao(statusQuestao: StatusQuestao): number[] {
    return this.provasConcursos.map(prova =>
      prova.questoes.filter(q => q.status === statusQuestao).length
    );
  }
}
