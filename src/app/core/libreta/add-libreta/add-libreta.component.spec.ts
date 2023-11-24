import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibretaComponent } from './add-libreta.component';

describe('AddLibretaComponent', () => {
  let component: AddLibretaComponent;
  let fixture: ComponentFixture<AddLibretaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLibretaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLibretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
