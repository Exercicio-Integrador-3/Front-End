import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjetoComponent } from './pages/criacao/projeto/projeto.component';
import { ContratoComponent } from './pages/criacao/contrato/contrato.component';
import { AlocacaoComponent } from './pages/criacao/alocacao/alocacao.component';
import { PessoaComponent } from './pages/criacao/pessoa/pessoa.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'criacao/projetos', component: ProjetoComponent },
  { path: 'criacao/contratos', component: ContratoComponent },
  { path: 'criacao/alocacoes', component: AlocacaoComponent },
  { path: 'criacao/pessoas', component: PessoaComponent },

  { path: '**', redirectTo: '' }
];


