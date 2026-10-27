import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock asynchronous fetch simulating API call with network latency and configurable failure
export const fetchAcademicCatalog = createAsyncThunk(
  'academic/fetchCatalog',
  async ({ forceError = false } = {}, { rejectWithValue }) => {
    // Simulate 800ms API latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (forceError) {
      return rejectWithValue('Network timeout: Apex University Academic Server (504 Gateway Timeout). Please retry.');
    }

    return [
      {
        id: 'course-1',
        name: 'Database Management Systems',
        code: '24CSE0209',
        credits: 4,
        type: 'Core Departmental',
        faculty: 'Prof. R. Sharma',
        semester: 'Semester 3',
        status: 'Enrolled'
      },
      {
        id: 'course-2',
        name: 'Discrete Mathematical Structures',
        code: '24MTH0104',
        credits: 4,
        type: 'Foundational Math',
        faculty: 'Dr. V. Gupta',
        semester: 'Semester 3',
        status: 'Enrolled'
      },
      {
        id: 'course-3',
        name: 'Object Oriented Programming with Java',
        code: '24CSE0210',
        credits: 4,
        type: 'Core Departmental',
        faculty: 'Dr. Neha Verma',
        semester: 'Semester 3',
        status: 'Enrolled'
      },
      {
        id: 'course-4',
        name: 'Front End Engineering II (React & Redux)',
        code: '25CSE0203',
        credits: 4,
        type: 'Specialization Core',
        faculty: 'Dr. S. K. Narayan',
        semester: 'Semester 3',
        status: 'Enrolled'
      },
      {
        id: 'course-5',
        name: 'Fundamentals of Electrical Engineering',
        code: '24CSE0211',
        credits: 3,
        type: 'Interdisciplinary',
        faculty: 'Dr. Alok Verma',
        semester: 'Semester 3',
        status: 'Enrolled'
      }
    ];
  }
);

const academicSlice = createSlice({
  name: 'academic',
  initialState: {
    courses: [],
    loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null,
    lastUpdated: null
  },
  reducers: {
    clearAcademicError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicCatalog.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchAcademicCatalog.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.courses = action.payload;
        state.lastUpdated = new Date().toLocaleTimeString();
        state.error = null;
      })
      .addCase(fetchAcademicCatalog.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload || 'Failed to fetch academic catalog';
      });
  }
});

export const { clearAcademicError } = academicSlice.actions;

export const selectAcademicCourses = (state) => state.academic.courses;
export const selectAcademicLoading = (state) => state.academic.loading;
export const selectAcademicError = (state) => state.academic.error;
export const selectAcademicLastUpdated = (state) => state.academic.lastUpdated;

export default academicSlice.reducer;
