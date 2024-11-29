import { Component, Input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-collapse',
  standalone: true,
  imports: [AccordionModule],
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss'
})

export class CollapseComponent {
  @Input() title: string = '';
}
