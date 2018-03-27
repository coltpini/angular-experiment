import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FliesComponent } from './flies.component';

describe('FliesComponent', () => {
  let component: FliesComponent;
  let fixture: ComponentFixture<FliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
