import { useRouter } from "next/router";
import { useEffect } from "react";

const usePopstate = (path: string) => {
  const router = useRouter();

  const goTo = () => {
    history.pushState(null, "", null);
    router.replace(path);
  };

  useEffect(() => {
    (() => {
      window.addEventListener("popstate", goTo);
    })();

    return () => {
      window.removeEventListener("popstate", goTo);
    };
  }, []);
};

export default usePopstate;
