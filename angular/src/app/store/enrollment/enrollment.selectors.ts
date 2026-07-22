import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(
  selectEnrollmentState,
  (state) => state.enrolledCourseIds
);

export const selectEnrolledCourses = createSelector(
  selectEnrolledIds,
  selectAllCourses,
  (enrolledIds, courses) => courses.filter((c) => enrolledIds.includes(c.id))
);
