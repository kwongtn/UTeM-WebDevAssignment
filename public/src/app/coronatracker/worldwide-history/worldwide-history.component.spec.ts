import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldwideHistoryComponent } from './worldwide-history.component';

describe('WorldwideHistoryComponent', () => {
  let component: WorldwideHistoryComponent;
  let fixture: ComponentFixture<WorldwideHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldwideHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldwideHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
