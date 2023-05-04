import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthorigedComponent } from './un-authoriged.component';

describe('UnAuthorigedComponent', () => {
  let component: UnAuthorigedComponent;
  let fixture: ComponentFixture<UnAuthorigedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnAuthorigedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthorigedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
