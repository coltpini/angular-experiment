import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fly } from '../../data/fly';
import { FlyService } from '../../fly.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: [ './list.component.css' ]
})
export class ListComponent implements OnInit {
  flies: Fly[] = [];
  tags: string[] = [];
  activeTag: string;

  constructor(
    private flyService: FlyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getFlies();
    this.getTags();
    this.route.params.subscribe( params => {
      this.activeTag = params.tag
      this.getFlies();
    })
  }

  getFlies(): void {
    this.flyService.getFlies().subscribe(flies => {
      if(this.activeTag !== 'all') {
        flies = flies.filter( fly => fly.tags.indexOf(this.activeTag) > -1)
      }
      this.flies = flies
    });
  }

  getTags():void {
    this.flyService.getTags().subscribe(tags => this.tags = tags);
  }
}
