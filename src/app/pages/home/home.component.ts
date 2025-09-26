import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule],
})
export class HomeComponent {
  menuCards = [
    {
      title: 'Projetos',
      description: 'Gerencie e acompanhe todos os seus projetos em um só lugar',
      icon: 'folder',
      route: '/projetos',
      color: 'primary',
      stats: '12 Ativos',
    },
    {
      title: 'Contratos',
      description: 'Administre contratos, prazos e documentações importantes',
      icon: 'contract',
      route: '/contratos',
      color: 'secondary',
      stats: '8 Vigentes',
    },
    {
      title: 'Alocações',
      description: 'Organize recursos e alocações de equipe nos projetos',
      icon: 'allocation',
      route: '/alocacoes',
      color: 'accent',
      stats: '24 Ativas',
    },
    {
      title: 'Pessoas',
      description: 'Gerencie equipes, colaboradores e suas competências',
      icon: 'people',
      route: '/pessoas',
      color: 'success',
      stats: '45 Cadastradas',
    },
  ];

  recentActivities = [
    {
      type: 'projeto',
      title: 'Novo projeto "Sistema Mobile" criado',
      time: '2 horas atrás',
      user: 'João Silva',
    },
    {
      type: 'contrato',
      title: 'Contrato #2023-45 renovado',
      time: '1 dia atrás',
      user: 'Maria Santos',
    },
    {
      type: 'alocacao',
      title: '3 desenvolvedores alocados no Projeto Alpha',
      time: '2 dias atrás',
      user: 'Pedro Costa',
    },
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getActivityIcon(type: string): string {
    const icons: { [key: string]: string } = {
      projeto: 'folder',
      contrato: 'contract',
      alocacao: 'allocation',
      pessoa: 'people',
    };
    return icons[type] || 'info';
  }
}
