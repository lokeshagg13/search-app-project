import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "./context/AuthProvider";
import Layout from "./components/layout/layout";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <main className="app">
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              auth?.email && auth?.accessToken ? (
                <Navigate to="/search" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Global paths */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route */}
          <Route
            path="/search"
            element={
              auth?.email && auth?.accessToken ? (
                <Search />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Invalid Paths */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
