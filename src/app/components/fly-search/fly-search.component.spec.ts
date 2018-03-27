import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlySearchComponent } from './fly-search.component';

describe('FlySearchComponent', () => {
  let component: FlySearchComponent;
  let fixture: ComponentFixture<FlySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
