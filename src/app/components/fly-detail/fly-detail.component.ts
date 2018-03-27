import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Fly }         from '../../data/fly';
import { FlyService }  from '../../fly.service';

@Component({
  selector: 'app-fly-detail',
  templateUrl: './fly-detail.component.html',
  styleUrls: [ './fly-detail.component.css' ]
})
export class FlyDetailComponent implements OnInit {
  @Input() fly: Fly;

  constructor(
    private route: ActivatedRoute,
    private flyService: FlyService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFly();
  }

  getFly(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.flyService.getFly(id)
      .subscribe(fly => this.fly = fly);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.flyService.updateFly(this.fly)
      .subscribe(() => this.goBack());
  }
}
