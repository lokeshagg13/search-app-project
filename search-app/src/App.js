import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/layout";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";

function App() {
  const { auth } = useAuth();
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
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/search" element={<Search />} />
            </Route>
          </Route>

          {/* Invalid Paths */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
