import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function getPathname() {
  if (typeof window === "undefined") {
    return "/";
  }

  return window.location.pathname || "/";
}

export default function App() {
  const [pathname, setPathname] = useState(getPathname);

  useEffect(() => {
    const onPopState = () => setPathname(getPathname());

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPath) => {
    if (nextPath === pathname) {
      return;
    }

    window.history.pushState({}, "", nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname === "/about") {
    return <AboutPage currentPath={pathname} onNavigate={navigate} />;
  }

  if (pathname === "/contact") {
    return <ContactPage currentPath={pathname} onNavigate={navigate} />;
  }

  return <HomePage onNavigate={navigate} currentPath={pathname} />;
}