import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../loadingLayout.module.scss";

const GoogleAuth = () => {
  const { query, push } = useRouter();

  useEffect(() => {
    if (query?.code) {
      (async () => {
        const { isNewUser, accessToken, refreshToken } = {};
        // case 1) 회원가입
        if (isNewUser) {
          await signUpProcess();
        }
        // case 2) 정상 로그인
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, {
            path: "/",
          });
          setCookie("refreshToken", refreshToken, {
            path: "/",
          });
          push("/");
        }
      })();
    }
  }, [query?.code]);

  const getLoginData = async () => {
    // const { data: googleTokenData } = await axios.post(
    //   `https://www.googleapis.com/oauth2/v4/token`,
    //   {
    //     code: query?.code,
    //     grant_type: "authorization_code",
    //     client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    //     client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    //     redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    //   },
    //   { headers: { "content-type": "application/x-www-form-urlencoded" } },
    // );
    const idToken = ""; // googleTokenData.id_token
    if (!idToken) {
      return;
    }
    // const { data } = await basicInstance.post("/v1/auth/oidc/login", {
    //   idToken,
    //   oauthType: "GOOGLE",
    // });
    return data;
  };

  const signUpProcess = async () => {
    //  const { data: registerVerifyData } = await basicInstance.post(
    //     "/v1/auth/register/verify ",
    //     {
    //       oauthType: "GOOGLE",
    //       idToken: googleTokenData.id_token,
    //       kakaoAccessToken: null,
    //     },
    //   );

    if (data.status === "OAUTH_VERIFIED") {
      setCookie("oauthId", data.oauthId, {
        path: "/",
      });
      setCookie("oauthType", data.oauthType, {
        path: "/",
      });
      push({
        pathname: "/onboarding",
      });
    }
  };

  const setMyProfile = async () => {
    const { data } = await axios.get(`${baseURL}/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data: profileData } = await axios.get(`${baseURL}/v1/users/profile/${data?.data.id}`);

    setProfile({
      userId: profileData.data.userId,
      profileImage: profileData.data.profileImage,
      nickname: profileData.data.nickname,
      description: profileData.data.description,
    });
  };

  return (
    <div className={styles.loadingLayout}>
      <Image
        src={"/assets/icons/loading/threeDots.gif"}
        alt={"loading dots"}
        width={150}
        height={150}
      />
    </div>
  );
};

export default GoogleAuth;
