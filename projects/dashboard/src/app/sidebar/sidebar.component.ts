import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const dashboardRoutes: RouteInfo[] = [
    { path: '/create_event', title: 'Create Event',  icon: 'nc-icon nc-chart-pie-35', class: 'nav-link' },
    { path: '/event_proposal', title: ' Event Proposal',  icon:'nc-icon nc-chart-pie-35', class: 'nav-link' },
    { path: '/sponsors', title: 'Sponsors',  icon:'nc-icon nc-chart-pie-35', class: 'nav-link' },
    { path: '#', title: 'Services',  icon:'nc-icon nc-chart-pie-35', class: 'nav-link' },
    { path: '#', title: 'Attendees',  icon:'nc-icon nc-chart-pie-35', class: 'nav-link' },
    { path: '#', title: 'Notifications',  icon:'nc-icon nc-chart-pie-35', class: 'nav-link' },
    { path: '#', title: 'Insights',  icon:'nc-icon nc-chart-pie-35', class: 'nav-link' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = dashboardRoutes.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;

};
}
