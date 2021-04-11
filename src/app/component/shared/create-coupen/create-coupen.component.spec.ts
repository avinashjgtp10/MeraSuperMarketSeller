import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoupenComponent } from './create-coupen.component';

describe('CreateCoupenComponent', () => {
  let component: CreateCoupenComponent;
  let fixture: ComponentFixture<CreateCoupenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCoupenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCoupenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
