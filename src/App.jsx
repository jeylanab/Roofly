// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./Components/Navigation";
import { Home } from "./Components/Home";
import { Footer } from "./Components/Footer";
import { About } from "./Pages/About";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Favorites } from "./Pages/Favorites";
import { Buy } from "./Pages/Buy";
import { Rent } from "./Pages/Rent";
import { Admin } from "./Pages/Admin";
import { PropertyDetails } from "./Pages/PropertyDetails";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Login />;
  }

  return children;
};

// Admin Route wrapper component
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }
  
  if (!user || user.email !== 'admin@example.com') {
    return <Navigate to="/" />;
  }

  return children;
};

// Main App Content
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <FavoritesProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow lg:mx-20 mx-5 my-5">
          <Navigation />
          
          <main className="mt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buy" element={
                <ProtectedRoute>
                  <Buy />
                </ProtectedRoute>
              } />
              <Route path="/rent" element={
                <ProtectedRoute>
                  <Rent />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              } />
              <Route path="/property/:id" element={
                <ProtectedRoute>
                  <PropertyDetails />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>
        </div>
        
        <Footer />
      </div>
    </FavoritesProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
