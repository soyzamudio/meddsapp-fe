import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  {
    path: '',
    data: { preload: true },
    loadComponent: () => import('./dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'pacientes',
    children: [
      {
        path: '',
        loadComponent: () => import('./patients/patients.component')
        .then(m => m.PatientsComponent),
      },
      {
        path: 'crear',
        loadComponent: () => import('./patients/create/create.component')
            .then(m => m.CreateComponent)
      },
      {
        path: 'detalles/:id',
        loadComponent: () => import('./patients/details/details.component')
            .then(m => m.DetailsComponent)
      },
    ]
  },
  {
    path: 'mensajes',
    loadComponent: () => import('./chat/chat.component')
        .then(m => m.ChatComponent)
  },
  {
    path: 'calendario',
    loadComponent: () => import('./schedule/schedule.component')
        .then(m => m.ScheduleComponent)
  },
  {
    path: 'videollamada/:id',
    loadComponent: () => import('./conference/conference.component')
        .then(m => m.ConferenceComponent)
  },
  {
    path: 'reportes',
    loadComponent: () => import('./reports/reports.component')
        .then(m => m.ReportsComponent)
  },
];
