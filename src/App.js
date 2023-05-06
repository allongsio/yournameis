import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Routers from "./shared/Router";

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
