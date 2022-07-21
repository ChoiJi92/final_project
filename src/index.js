import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";
import {RecoilRoot} from 'recoil'
import Loading from "./pages/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      suspense:true
    }
  }
}
);
root.render(
    <QueryClientProvider client={queryClient}>
      {/* devtools */}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <RecoilRoot>
      <Suspense fallback={<Loading></Loading>}>
      <BrowserRouter>
      <ScrollToTop/>
        <App />
      </BrowserRouter>
      </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
