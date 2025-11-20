import { createRoot } from "react-dom/client";
import { Theme, Container } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import App from "./components/App.tsx";

createRoot(document.getElementById("root")!).render(
  <Theme>
    {/* Size=3 has a max-width of 880px, but the Figma design has a width of 850px. */}
    <Container size="3" my="7" py="20px">
      <App />
    </Container>
  </Theme>
);
