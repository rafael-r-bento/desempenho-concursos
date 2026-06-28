import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExamDialog } from './delete-exam-dialog';

describe('DeleteExamDialog', () => {
  let component: DeleteExamDialog;
  let fixture: ComponentFixture<DeleteExamDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteExamDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteExamDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
