import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/createAccount";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import LoadingScreen from "./components/loadingScreen";
import ProtectedRoute from "./routes/protected-route";
import PostForm from "./components/postForm";
import EditPost from "./components/editPost";
import PostView from "./components/postView";
import Info from "./components/info";
import Board from "./routes/board";
import Home from "./routes/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "board",
        element: <Board />,
      },
      
      {
        path: "info",
        element: <Info/>
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "postForm",
        element: <PostForm />,
      },
      {
        path: "editForm/:id",
        element: <EditPost />,
      },
      {
        path: "postView/:id",
        element: <PostView/>
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color:black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoding, setLoding] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoding(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoding ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
