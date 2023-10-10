import './App.css';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Homepage from './components/homepage';
import ShoppingPlace from './components/shoppingplace/shoppingplace.tsx';
import Page2 from './components/page2';
import Container from './components/layouts/container';
import { Logout } from './components/logout';
import { Login } from "./components/login";
import { CreateProduct } from "./components/createproduct";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider

const queryClient = new QueryClient(); // Create a QueryClient instance

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/reango-frontend" element={ <Container /> }>
        <Route index element={ <Homepage /> } />
        <Route path="/reango-frontend/shoppingplace" element={ <ShoppingPlace /> } />
        <Route path="/reango-frontend/page2" element={ <Page2 /> } />
        <Route path="/reango-frontend/login" element={ <Login/> } />
        <Route path="/reango-frontend/logout" element={ <Logout/> } />
        <Route path="/reango-frontend/createproduct" element={ <CreateProduct/> } />
      </Route>
    </Route>
  )
)

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}> {/* Wrap your App with QueryClientProvider */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
