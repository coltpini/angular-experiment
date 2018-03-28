import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Fly }         from '../../data/fly';
import { FlyService }  from '../../fly.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit {
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
    const id = this.route.snapshot.paramMap.get('id');
    this.flyService.getFly(id)
      .subscribe(fly => this.fly = fly);
  }

  goBack(): void {
    this.location.back();
  }
}
