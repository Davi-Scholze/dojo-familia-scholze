import { Outlet } from "react-router-dom";
import { InstallPrompt } from "./components/InstallPrompt";

export function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Outlet />
      <InstallPrompt />
    </div>
  );
}
