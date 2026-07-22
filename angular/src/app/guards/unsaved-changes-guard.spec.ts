import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { unsavedChangesGuard } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should allow navigation when form is not dirty', () => {
    const mockComponent = {
      enrollForm: { dirty: false },
    } as any;

    const result = TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(mockComponent, {} as any, {} as any, {} as any)
    );
    expect(result).toBeTruthy();
  });

  it('should be defined', () => {
    expect(unsavedChangesGuard).toBeTruthy();
  });
});
