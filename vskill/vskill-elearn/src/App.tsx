import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Existing pages
import Index from "./pages/Index";

// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";

import Odyssey from "./pages/Odyssey";
import Arena from "./pages/Arena";
import Tribe from "./pages/Tribe";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";


// Newly imported AboutUs component
import AboutUs from "./pages/AboutUs";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              {/*<Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />*/}
              
              <Route path="/AuthPage" element={<AuthPage />} />
              <Route path="/odyssey" element={<Odyssey />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="/tribe" element={<Tribe />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blog" element={<Tribe />} /> 
              
              {/* Newly added About Us route */}
              <Route path="/aboutus" element={<AboutUs />} />

              {/* Fallback for any unmatched paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
