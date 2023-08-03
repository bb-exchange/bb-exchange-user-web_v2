import { basicInstance } from ".src/api/instance";
import { signIn } from ".src/features/userSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Image from "next/image";
import styles from "../loadingLayout.module.scss";

const AppleAuth = () => {
  const { query, push } = useRouter();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies([
    "oauthId",
    "oauthType",
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    if (query?.code) {
      (async () => {
        const response = await basicInstance.post("/v1/auth/oidc/login", {
          idToken: query.id_token,
          oauthType: "APPLE",
        });

        //not registerd
        if (response.data.message === "user not registered") {
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
            `https://api.stage-bibubex.com/v1/users/me`,
            {
              headers: {
                Authorization: `Bearer ${response.data.data.data.accessToken}`,
              },
            }
          );
          dispatch(signIn(data?.data.nickname)); //전역 로그인 처리
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
