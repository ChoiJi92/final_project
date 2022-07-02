import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// navigate 이동시 스크롤 맨위로 올라가게 하기
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}