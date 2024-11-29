import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    RippleModule,
    SplitButtonModule,
    ToggleButtonModule,
    ButtonModule,
    MenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  //todo: faltaría método para saber información del usuario como Nombre, rol y las siglas para poderlos implementar en el header. Lo mismo con la cantidad de notificaciones.
  public menuItems: MenuItem[] | undefined;
  public userOpcions: MenuItem[] | undefined;
  public wantToToglleAdmin: boolean = false;
  ngOnInit() {
    //todo:dependiendo del rol (se verá unas opciones u otras)
    this.userOpcions = [
      {
        label: 'Perfil',
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
      {
        separator: true,
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off',
        command: () => {
          this.signOut();
        }
      },
    ]
    //todo: "menuItems" para cuando haya definido la vista de admin
    this.menuItems = [
      // {
      //   label: 'Home',
      //   icon: 'pi pi-home'
      // },
      // {
      //   label: 'Features',
      //   icon: 'pi pi-star'
      // },
      // {
      //   label: 'Projects',
      //   icon: 'pi pi-search',
      //   items: [
      //     {
      //       label: 'Core',
      //       icon: 'pi pi-bolt',
      //       shortcut: '⌘+S'
      //     },
      //     {
      //       label: 'Blocks',
      //       icon: 'pi pi-server',
      //       shortcut: '⌘+B'
      //     },
      //     {
      //       label: 'UI Kit',
      //       icon: 'pi pi-pencil',
      //       shortcut: '⌘+U'
      //     },
      //     {
      //       separator: true
      //     },
      //     {
      //       label: 'Templates',
      //       icon: 'pi pi-palette',
      //       items: [
      //         {
      //           label: 'Apollo',
      //           icon: 'pi pi-palette',
      //           badge: '2'
      //         },
      //         {
      //           label: 'Ultima',
      //           icon: 'pi pi-palette',
      //           badge: '3'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   label: 'Contact',
      //   icon: 'pi pi-envelope',
      //   badge: '3'
      // }
    ];
  }

  public navigateToDashboard() {
    this.router.navigate(['/'])
  }

  public signOut() {
    // this.router.navigate(['/login']) //todo: redireccionar a login
    this.messageService.add({
      severity: 'success',
      summary: 'Sesión cerrada',
      detail: 'Hasta pronto'
    })
  }
}
