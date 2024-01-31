import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import ContainedBtn from ".src/components/Buttons/ContainedBtn";
import IconRedCaution from "../../../../public/assets/icons/RedCaution.svg";
import IconBlueCheck from "../../../../public/assets/icons/BlueCheck.svg";

import styles from "./index.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkRecommendCode } from ".src/api/users/users";
import { useEffect, useState } from "react";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import PopupBg from ".src/components/common/popupBg";
import { registerUser } from ".src/api/auth/auth";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { isLoginState } from ".src/recoil";

interface IInputs {
  recommendCode: string;
}

const RecommendCode = () => {
  const router = useRouter();
  const [cookies, setCookies] = useCookies([
    "oauthId",
    "oauthType",
    "phoneNumber",
    "accessToken",
    "refreshToken",
  ]);

  const setIsLoginState = useSetRecoilState(isLoginState);

  const [openConfirmPopup, setOpenConfirmPopup] = useState<boolean>(false);
  const [validCode, setValidCode] = useState<string>("");

  const form = useForm<IInputs>({
    mode: "onChange",
  });

  const {
    data: isRecommendData,
    refetch: refetchRecommend,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["recommendCode"],
    queryFn: () => checkRecommendCode(form.watch("recommendCode")),
    enabled: false,
  });

  const mutationRegister = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setCookies("accessToken", data.data.accessToken);
      setCookies("refreshToken", data.data.refreshToken);
      setIsLoginState(true);
      router.push("/auth/signup-completion");
    },
    onError: (error) => {},
  });

  useEffect(() => {
    if (isError)
      form.setError("recommendCode", {
        message: "추천코드를 확인할 수 없습니다",
      });
    else if (isSuccess && isRecommendData?.isExists)
      setValidCode(form.watch("recommendCode"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, form.watch("recommendCode")]);

  //NOTE - 추천인 코드 유효성 조회
  const searchCode = () => {
    refetchRecommend();
  };

  const onRegister = (data: IInputs) => {
    mutationRegister.mutate({
      oauthType: cookies.oauthType,
      oauthId: cookies.oauthId,
      recommendCode: validCode,
    });
  };
  const onNextStep = () => {
    mutationRegister.mutate({
      oauthType: cookies.oauthType,
      oauthId: cookies.oauthId,
      recommendCode: null,
    });
  };

  //NOTE - 뒤로가기 막기 팝업창 추가
  const preventGoBack = () => {
    history.pushState(null, "", location.href);
    setOpenConfirmPopup(true);
  };
  useEffect(() => {
    (() => {
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", preventGoBack);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  const isAvailable =
    form.watch("recommendCode") && form.watch("recommendCode") === validCode
      ? true
      : false;
  const isDisable =
    form.watch("recommendCode") && !Object.keys(form.formState.errors).length
      ? false
      : true;

  return (
    <div id={styles.recommendCode} className={styles.container}>
      <div className={styles.contentBox}>
        <h2 className={styles.title}>
          <span className={styles.blueText}>추천인 코드</span>를 입력해주세요
        </h2>

        <form>
          <section className={styles.inputWrap}>
            <div className={styles.inputLayout}>
              <input
                type="text"
                placeholder="추천인 코드를 입력해주세요"
                {...form.register("recommendCode", {
                  required: false,
                  validate: {
                    noSpaceCheck: (v) =>
                      v.includes(" ") ? "띄어쓰기를 사용할 수 없습니다" : true,
                  },
                })}
              />
            </div>
            <ContainedBtn
              text={"조회하기"}
              disabled={isDisable}
              onClick={form.handleSubmit(searchCode)}
            />
          </section>
          {form.formState.errors?.recommendCode && (
            <p className={styles.errorMessage}>
              <IconRedCaution />
              <span>{form.formState.errors?.recommendCode?.message}</span>
            </p>
          )}
          {isAvailable && !Object.keys(form.formState.errors).length && (
            <p className={styles.confirmMessage}>
              <IconBlueCheck />
              <span>확인되었습니다</span>
            </p>
          )}
          <ContainedBtn
            text={"다음"}
            disabled={isAvailable ? false : true}
            onClick={form.handleSubmit(onRegister)}
          />
          <div onClick={onNextStep} className={styles.nextStep}>
            건너뛰기
          </div>
        </form>
      </div>
      {openConfirmPopup && (
        <>
          <ConfirmPopup
            cancelFunc={() => setOpenConfirmPopup(false)}
            confirmFunc={() => {
              setOpenConfirmPopup(false);
              router.push("/auth/signin");
            }}
            content={
              <>
                <span className={styles.boldText}>
                  회원가입이 완료되지 않았습니다!
                </span>
                <span>처음 화면으로 돌아가시겠습니까?</span>
              </>
            }
          />
          <PopupBg bg off={() => setOpenConfirmPopup(false)} />
        </>
      )}
    </div>
  );
};

export default RecommendCode;

export function getStaticProps() {
  return { props: { navBar: true } };
}
