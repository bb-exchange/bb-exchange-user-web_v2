import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const AppleAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "authKey",
    "accessToken",
    "refreshToken",
  ]);

  //https://appleid.apple.com/auth/token

  // const res = await axios.post(
  //     `https://appleid.apple.com/auth/token`,
  //     {
  //       code: query?.code,
  //       grant_type: "authorization_code",
  //       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  //       client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  //       redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  //     },
  //     { headers: { "content-type": "application/x-www-form-urlencoded" } }
  //   );
  return <div></div>;
};

export default AppleAuth;
