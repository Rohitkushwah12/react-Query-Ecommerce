import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar/Navbar";
import UserAuthentication from "./components/UserAuth/UserAuthentication";
import PageNotFound from "./components/pages/PageNotFound";
import Products from "./components/pages/Products";
import Product from "./components/pages/Product";
import Profile from "./components/pages/Profile";
import Cart from "./components/pages/Cart";

const queryClient = new QueryClient({});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserAuthentication component={Home} />} />
          <Route
            path="/login"
            element={<UserAuthentication component={Login} />}
          />
          <Route
            path="/products"
            element={<UserAuthentication component={Products} />}
          />
          <Route
            path="/products/:id"
            element={<UserAuthentication component={Product} />}
          />
          <Route
            path="/profile"
            element={<UserAuthentication component={Profile} />}
          />
          <Route
            path="/cart"
            element={<UserAuthentication component={Cart} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
