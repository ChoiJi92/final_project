import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";
import {RecoilRoot} from 'recoil'

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
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* devtools */}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <RecoilRoot>
      <Suspense fallback={<div>로딩 중 입니다! :)</div>}>
      <BrowserRouter>
      <ScrollToTop/>
        <App />
      </BrowserRouter>
      </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
