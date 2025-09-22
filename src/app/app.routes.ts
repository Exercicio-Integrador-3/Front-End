import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjetoComponent } from './pages/criacao/projeto/projeto.component';
import { ContratoComponent } from './pages/criacao/contrato/contrato.component';
import { AlocacaoComponent } from './pages/criacao/alocacao/alocacao.component';
import { GeralComponent } from './pages/custo/geral/geral.component';
import { PeriodoComponent } from './pages/custo/periodo/periodo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'criacao/projetos', component: ProjetoComponent },
  { path: 'criacao/contratos', component: ContratoComponent },
  { path: 'criacao/alocacoes', component: AlocacaoComponent },

  { path: 'calculo/geral', component: GeralComponent },
  { path: 'calculo/periodo', component: PeriodoComponent },

  { path: '**', redirectTo: '' }
];


