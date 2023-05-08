import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Routers from "./shared/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
