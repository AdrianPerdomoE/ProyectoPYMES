import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymeViewComponent } from './pyme-view.component';

describe('PymeViewComponent', () => {
  let component: PymeViewComponent;
  let fixture: ComponentFixture<PymeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PymeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PymeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
