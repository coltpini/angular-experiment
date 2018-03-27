import { Component, OnInit } from '@angular/core';

import { Fly } from '../../data/fly';
import { FlyService } from '../../fly.service';

@Component({
  selector: 'app-flies',
  templateUrl: './flies.component.html',
  styleUrls: ['./flies.component.css']
})
export class FliesComponent implements OnInit {
  flies: Fly[];

  constructor(private flyService: FlyService) { }

  ngOnInit() {
    this.getFlies();
  }

  getFlies(): void {
    this.flyService.getFlies()
    .subscribe(flies => this.flies = flies);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.flyService.addFly({ name } as Fly)
      .subscribe(fly => {
        this.flies.push(fly);
      });
  }

  delete(fly: Fly): void {
    this.flies = this.flies.filter(f => f !== fly);
    this.flyService.deleteFly(fly).subscribe();
  }

}
