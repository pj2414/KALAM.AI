import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthLayout from "./components/auth/AuthLayout";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import ContentGenerate from "./components/content/ContentGenerate";
import EssayGenerator from "./components/content/EssayGenerator";
import AssignmentGenerator from "./components/content/AssignmentGenerator";
import SummaryGenerator from "./components/content/SummaryGenerator";
import ThesisGenerator from "./components/content/ThesisGenerator";
import SpeechGenerator from "./components/content/SpeechGenerator";
import NoticeGenerator from "./components/content/NoticeGenerator";
import ReportGenerator from "./components/content/ReportGenerator";
import LetterGenerator from "./components/content/LetterGenerator";
import ApplicationGenerator from "./components/content/ApplicationGenerator";
import CaptionGenerator from "./components/content/CaptionGenerator";
import DiaryGenerator from "./components/content/DiaryGenerator";
import ScriptGenerator from "./components/content/ScriptGenerator";
import ContentHistory from "./components/content/ContentHistory";
import ContentLibrary from "./components/content/ContentLibrary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
          <p className="text-white text-lg">Loading कलम.AI...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <AuthLayout />;
  }
  
  return <>{children}</>;
};

// Main App Routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout title="Dashboard" subtitle="Welcome to your AI content creation hub">
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate" 
        element={
          <ProtectedRoute>
            <MainLayout title="Generate Content" subtitle="Create amazing content with AI">
              <ContentGenerate />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/essay" 
        element={
          <ProtectedRoute>
            <MainLayout title="Essay Generator" subtitle="Create compelling essays">
              <EssayGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/assignment" 
        element={
          <ProtectedRoute>
            <MainLayout title="Assignment Generator" subtitle="Complete your assignments">
              <AssignmentGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/summary" 
        element={
          <ProtectedRoute>
            <MainLayout title="Summary Generator" subtitle="Summarize any text">
              <SummaryGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/thesis" 
        element={
          <ProtectedRoute>
            <MainLayout title="Thesis Generator" subtitle="Create academic abstracts">
              <ThesisGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/speech" 
        element={
          <ProtectedRoute>
            <MainLayout title="Speech Generator" subtitle="Craft powerful speeches">
              <SpeechGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/notice" 
        element={
          <ProtectedRoute>
            <MainLayout title="Notice Generator" subtitle="Create formal notices">
              <NoticeGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/report" 
        element={
          <ProtectedRoute>
            <MainLayout title="Report Generator" subtitle="Generate detailed reports">
              <ReportGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/letter" 
        element={
          <ProtectedRoute>
            <MainLayout title="Letter Generator" subtitle="Write professional letters">
              <LetterGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/application" 
        element={
          <ProtectedRoute>
            <MainLayout title="Application Generator" subtitle="Create formal applications">
              <ApplicationGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/caption" 
        element={
          <ProtectedRoute>
            <MainLayout title="Caption Generator" subtitle="Create engaging captions">
              <CaptionGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/diary" 
        element={
          <ProtectedRoute>
            <MainLayout title="Diary Generator" subtitle="Write personal diary entries">
              <DiaryGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/generate/script" 
        element={
          <ProtectedRoute>
            <MainLayout title="Script Generator" subtitle="Create event scripts">
              <ScriptGenerator />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/library" 
        element={
          <ProtectedRoute>
            <MainLayout title="Content Library" subtitle="Organize and manage your content">
              <ContentLibrary />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <MainLayout title="Content History" subtitle="Browse your content creation history">
              <ContentHistory />
            </MainLayout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
