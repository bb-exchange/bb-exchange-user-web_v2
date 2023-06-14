import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const AppleAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "authKey",
    "accessToken",
    "refreshToken",
  ]);

  return <div></div>;
};

export default AppleAuth;
