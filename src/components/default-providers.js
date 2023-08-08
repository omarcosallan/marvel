import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function DefaultProviders({ children }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
