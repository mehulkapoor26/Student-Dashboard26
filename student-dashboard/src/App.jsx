import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import NotFoundPage from './components/layout/NotFoundPage';

import DashboardView from './components/DashboardView';
import MyInfoView from './components/views/MyInfoView';
import AttendanceView from './components/views/AttendanceView';
import CalendarView from './components/views/CalendarView';
import UpdatesView from './components/views/UpdatesView';
import NotesView from './components/views/NotesView';
import LibraryView from './components/views/LibraryView';
import FeeView from './components/views/FeeView';
import PerformanceView from './components/views/PerformanceView';
import PortfolioView from './components/views/PortfolioView';
import CampusStoreView from './components/views/CampusStoreView';
import HostelView from './components/views/HostelView';
import SettingsView from './components/views/SettingsView';

import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';

export default function App() {
  return (
    <Routes>
      {/* Public Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Academic Dashboard Layout Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="my-info" element={<MyInfoView />} />
        <Route path="attendance" element={<AttendanceView />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="updates" element={<UpdatesView />} />
        <Route path="notes" element={<NotesView />} />
        <Route path="library" element={<LibraryView />} />
        <Route path="fee" element={<FeeView />} />
        <Route path="performance" element={<PerformanceView />} />
        {/* PE-II Syllabus Mini Projects */}
        <Route path="portfolio" element={<PortfolioView />} />
        <Route path="store" element={<CampusStoreView />} />
        <Route path="hostel" element={<HostelView />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>

      {/* 404 Wildcard Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
