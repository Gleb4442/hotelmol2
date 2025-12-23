import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TranslationProvider } from "@/lib/TranslationContext";
import { CookieBannerProvider } from "@/lib/CookieBannerContext";
import CookieBanner from "@/components/CookieBanner";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopOnNavigation from "@/components/ScrollToTopOnNavigation";

const Home = lazy(() => import("@/pages/Home"));
const Roomie = lazy(() => import("@/pages/Roomie"));
const Solutions = lazy(() => import("@/pages/Solutions"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

function LazyRoute({ component: Component }: { component: React.LazyExoticComponent<React.ComponentType<any>> }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">{() => <LazyRoute component={Home} />}</Route>
      <Route path="/roomie">{() => <LazyRoute component={Roomie} />}</Route>
      <Route path="/solutions">{() => <LazyRoute component={Solutions} />}</Route>
      <Route path="/about">{() => <LazyRoute component={About} />}</Route>
      <Route path="/contact">{() => <LazyRoute component={Contact} />}</Route>
      <Route path="/blog">{() => <LazyRoute component={Blog} />}</Route>
      <Route path="/blog/:slug">{() => <LazyRoute component={BlogPost} />}</Route>
      <Route path="/cookies">{() => <LazyRoute component={CookiePolicy} />}</Route>
      <Route>{() => <LazyRoute component={NotFound} />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <CookieBannerProvider>
      <QueryClientProvider client={queryClient}>
        <TranslationProvider>
          <TooltipProvider>
            <ScrollToTopOnNavigation />
            <Toaster />
            <Router />
            <CookieBanner />
            <FloatingButtons />
            <ScrollToTop />
          </TooltipProvider>
        </TranslationProvider>
      </QueryClientProvider>
    </CookieBannerProvider>
  );
}

export default App;
