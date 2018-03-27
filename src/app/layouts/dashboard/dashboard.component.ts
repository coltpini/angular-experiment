import { Component, OnInit } from '@angular/core';
import { Fly } from '../../data/fly';
import { FlyService } from '../../fly.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  flies: Fly[] = [];

  constructor(private flyService: FlyService) { }

  ngOnInit() {
    this.getFlies();
  }

  getFlies(): void {
    this.flyService.getFlies()
      .subscribe(flies => this.flies = flies.slice(1, 5));
  }
}
