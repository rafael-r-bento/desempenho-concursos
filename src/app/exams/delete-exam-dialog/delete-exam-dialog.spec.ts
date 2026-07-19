import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { vi } from 'vitest';

import { DeleteExamDialog } from './delete-exam-dialog';

describe('DeleteExamDialog', () => {
  let component: DeleteExamDialog;
  let fixture: ComponentFixture<DeleteExamDialog>;

  const mockDialogRef = {
    close: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteExamDialog],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
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
