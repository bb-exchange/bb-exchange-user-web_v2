import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

import styles from "./index.module.scss";
import ContainedBtn from ".src/components/Buttons/ContainedBtn";
import IconRedCaution from "../../../../public/assets/icons/RedCaution.svg";
import IconBlueCheck from "../../../../public/assets/icons/BlueCheck.svg";
import PopupBg from ".src/components/common/popupBg";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
import { useSetRecoilState } from "recoil";
import { userNameState } from ".src/recoil";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkNickname } from ".src/api/users/users";
import { registerNickname } from ".src/api/auth/auth";
import ErrorMsgPopup from ".src/components/common/popup/errorMsgPopup";
interface Inputs {
  nickname: string;
}

const Register = () => {
  const router = useRouter();
  const [cookies, setCookies] = useCookies([
    "oauthId",
    "oauthType",
    "phoneNumber",
    "accessToken",
    "refreshToken",
  ]);

  const setUserNameState = useSetRecoilState(userNameState);

  const [availableNickname, setAvailableNickname] = useState<string>("");
  const [openConfirmPopup, setOpenConfirmPopup] = useState(
    router.query.openConfirmPopup === "true" || false
  );
  const [openErrorPopup, setOpenErrorPopup] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  //NOTE - 닉네임 중복체크
  const { data: isNickNameData, refetch: refetchChackNickname } = useQuery({
    queryKey: ["checkNickname"],
    queryFn: () => checkNickname(watch("nickname")),
    enabled: false,
  });
  const duplicateCheck = async () => {
    refetchChackNickname();
  };
  useEffect(() => {
    if (isNickNameData?.isExists === true) {
      setError("nickname", { message: "이미 사용중인 닉네임입니다" });
    } else {
      setAvailableNickname(watch("nickname"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNickNameData, watch("nickname")]);

  //NOTE - 닉네임 등록
  const nicknameRegisterMutation = useMutation({
    mutationFn: registerNickname,
    onSuccess: (data, variables, context) => {
      setUserNameState(watch("nickname"));
      router.push("/auth/recommend-code");
    },
    onError: (error: any) => {
      setOpenErrorPopup(true);
    },
  });

  //NOTE - 회원가입 클릭
  const reqRegister = async (data: Inputs) => {
    await nicknameRegisterMutation.mutate({
      oauthType: cookies.oauthType,
      oauthId: cookies.oauthId,
      nickname: data.nickname,
    });
  };

  useEffect(() => {
    if (watch("nickname") !== availableNickname) {
      setAvailableNickname("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("nickname")]);

  //뒤로가기 막기 팝업창 추가
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

  //variable
  let isAvailable =
    watch("nickname") !== "" && availableNickname === watch("nickname");
  let isDisable =
    watch("nickname")?.length > 0 &&
    errors.nickname === undefined &&
    isAvailable === false;

  return (
    <>
      <div id={styles.register} className={styles.container}>
        <div className={styles.contentBox}>
          <h2 className={styles.title}>
            <span className={styles.blueText}>사용할 닉네임</span>을
            입력해주세요
          </h2>
          <form>
            <section className={styles.inputWrap}>
              <div className={styles.inputLayout}>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  {...register("nickname", {
                    required: false,
                    pattern: {
                      value: /^[ㄱ-ㅎ가-힣a-zA-Z0-9 ]+$/,
                      message: "특수문자를 입력할 수 없습니다.",
                    },
                    validate: {
                      noSpaceCheck: (v) =>
                        v.includes(" ")
                          ? "띄어쓰기를 사용할 수 없습니다"
                          : true,
                      lengthCheck: (v) =>
                        (v.length >= 3 && v.length <= 10) || v.length === 0 // 값이 없을 때 에러메세지가 노출되지 않도록 v.length === 0 추가
                          ? true
                          : "3자 이상 10자 이내로 작성해주세요",
                    },
                  })}
                />
              </div>
              <ContainedBtn
                text={"중복확인"}
                disabled={isDisable ? false : true}
                onClick={handleSubmit(duplicateCheck)}
              />
            </section>
            {errors?.nickname && (
              <p className={styles.errorMessage}>
                <IconRedCaution />
                <span>{errors?.nickname?.message}</span>
              </p>
            )}
            {isAvailable && (
              <p className={styles.confirmMessage}>
                <IconBlueCheck />
                <span>확인되었습니다</span>
              </p>
            )}
            <ContainedBtn
              text={"다음"}
              disabled={isAvailable ? false : true}
              onClick={handleSubmit(reqRegister)}
            />
          </form>
        </div>
        {openErrorPopup && (
          <>
            <ErrorMsgPopup
              confirmFunc={() => {
                setOpenErrorPopup(false);
                router.push("/auth/signin");
              }}
              msg={
                <>
                  <span>유효 시간이 만료되었습니다.</span>
                  <span>로그인 화면으로 이동합니다.</span>
                </>
              }
            />
            <PopupBg bg off={() => {}} />
          </>
        )}
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
    </>
  );
};

export default Register;

export function getStaticProps() {
  return { props: { navBar: true } };
}
