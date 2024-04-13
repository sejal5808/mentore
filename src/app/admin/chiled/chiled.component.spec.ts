import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiledComponent } from './chiled.component';

describe('ChiledComponent', () => {
  let component: ChiledComponent;
  let fixture: ComponentFixture<ChiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
