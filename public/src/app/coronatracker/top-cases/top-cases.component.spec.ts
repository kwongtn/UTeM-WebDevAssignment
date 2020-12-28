import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCasesComponent } from './top-cases.component';

describe('TopCasesComponent', () => {
  let component: TopCasesComponent;
  let fixture: ComponentFixture<TopCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
