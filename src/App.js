import './App.css';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Homepage from './components/homepage';
import Page1 from './components/page1';
import Page2 from './components/page2';
import Container from './components/layouts/container';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={ <Container /> }>
        <Route index element={ <Homepage /> } />
        <Route path="/page1" element={ <Page1 /> } />
        <Route path="/page2" element={ <Page2 /> } />
      </Route>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
