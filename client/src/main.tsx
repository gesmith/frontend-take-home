import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Theme, Container } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import App from "./components/pages/App.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Theme>
        <Container size="3" my="7" py="20px">
          <App />
        </Container>
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
