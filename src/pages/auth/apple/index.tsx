import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { useSetRecoilState } from "recoil";

import { basicInstance } from ".src/api/instance";
import styles from "../loadingLayout.module.scss";
import { isLoginState, userNameState } from ".src/recoil";

const AppleAuth = () => {
  const { query, push } = useRouter();
  const [cookie, setCookie] = useCookies([
    "oauthId",
    "oauthType",
    "accessToken",
    "refreshToken",
  ]);

  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUserNameState = useSetRecoilState(userNameState);

  useEffect(() => {
    if (query?.code) {
      (async () => {
        const response = await basicInstance.post("/v1/auth/oidc/login", {
          idToken: query.id_token,
          oauthType: "APPLE",
        });

        //not registerd
        if (response.data.message === "등록되지 않은 유저입니다.") {
          const {
            data: { data: registerVerifyData },
          } = await basicInstance.post("/v1/auth/register/verify ", {
            oauthType: "APPLE",
            idToken: query.id_token,
          });

          if (registerVerifyData.status === "OAUTH_VERIFIED") {
            setCookie("oauthId", registerVerifyData.oauthId, {
              path: "/",
            });
            setCookie("oauthType", registerVerifyData.oauthType, {
              path: "/",
            });
            push({
              pathname: `/auth/terms-agreement`,
            });
          }
        } else if (
          response.data.data.accessToken &&
          response.data.data.refreshToken
        ) {
          setCookie("accessToken", response.data.data.accessToken, {
            path: "/",
          });
          setCookie("refreshToken", response.data.data.refreshToken, {
            path: "/",
          });
          //닉네임 가져오기
          const { data } = await axios.get(
            `https://api.stage-bibeop.com/v1/users/me`,
            {
              headers: {
                Authorization: `Bearer ${response.data.data.accessToken}`,
              },
            }
          );
          setIsLoginState(true);
          setUserNameState(data?.data.nickname);
          push("/");
        }
      })();
    }
  }, [query?.code]);
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

export default AppleAuth;
