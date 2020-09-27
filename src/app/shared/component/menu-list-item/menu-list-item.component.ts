import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PublicService } from 'src/app/core/services/publicService';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'] ,
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean=false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(public navService: PublicService,
              public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {

 

    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.Url && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.Url}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.Url]);
   
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
// IconName: "group"
// MenuId: "b8c3e950-6ff8-e711-ad6e-6045cb6e9182"
// ParentId: "d14fe4f7-73f5-e911-926c-bcaec57c44ad"
// Title: "اطلاعات ثابت"
// Url: "/panel/BaseInformation/enum"
export interface NavItem {
  Title: string;
  disabled?: boolean;
  IconName: string;
  Url?: string;
  children?: NavItem[];
}
