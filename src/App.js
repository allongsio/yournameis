import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <div>App</div>
    </QueryClientProvider>
  );
}

export default App;
