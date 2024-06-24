import { BrowserRouter } from "react-router-dom";
import AppContent from "./components/AppContent";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}
