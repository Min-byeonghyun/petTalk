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
        element: <Home />,
      },
      {
        path: "board",
        element: <Board />,
      },

      {
        path: "info",
        element: <Info />,
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
        element: <PostView />,
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
  html, body, #root {
    min-height: 100vh;
    background: linear-gradient(130deg, #FFFDF6 70%, #F6CEB2 100%);
    font-family: 'Pretendard', 'Noto Sans KR', 'Segoe UI', 'Roboto', Arial, sans-serif;
    color: #222;
    letter-spacing: -0.2px;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: #FFAA4C;
    text-decoration: none;
    transition: color 0.15s;
  }
  a:hover {
    color: #7DB9B6;
    text-decoration: underline;
  }
  button, input, select, textarea {
    font-family: inherit;
    border-radius: 10px;
    outline: none;
  }
  ::selection { background: #FFAA4C33 }
  
  /* 깔끔한 카드/엘리먼트 그림자 */
  .dog-card-shadow {
    box-shadow: 0 4px 14px 0 rgba(255,170,76, 0.15), 0 1.5px 3px 0 rgba(80,60,40,0.06);
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
