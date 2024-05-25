import styles from "./editProf.module.scss";

import { useEffect } from "react";

import CautionRed from ".assets/icons/CautionRed.svg";
import CheckCircleBlue from ".assets/icons/CheckCircleBlue.svg";
import PlusGrey from ".assets/icons/PlusGrey.svg";
import CommonHeader from ".src/components/common/header/commonHeader";
import ConfirmTitlePopup from ".src/components/common/popup/confirmTitlePopup";
import PopupBg from ".src/components/common/popupBg";
import Image from ".src/components/Image";
import useGetMyProfile from ".src/hooks/common/useGetProfile";
import UseEditProf from ".src/hooks/mypage/editProf/useEditProf";

export default function EditProf() {
  const useEditProf = UseEditProf();
  const { profile: myProfile } = useGetMyProfile();

  useEffect(() => {
    if (myProfile) {
      useEditProf.setValue("nickname", myProfile.nickname);
      useEditProf.setValue("description", myProfile.description);
      useEditProf.setValue("profImg", myProfile.profileImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfile]);

  return (
    <>
      <CommonHeader />

      <main className={styles.editProf}>
        <form id="Form" onSubmit={useEditProf.handleSubmit(useEditProf.onSubmit)}>
          <button
            type="button"
            className={styles.profImgBtn}
            onClick={() => useEditProf.profImgInputRef.current?.click()}
          >
            {useEditProf.watch("profImg") || myProfile?.profileImage ? (
              <Image
                className={styles.profImg}
                width={100}
                height={100}
                loader
                src={useEditProf.watch("profImg") ?? (myProfile?.profileImage as string)}
                alt=""
              />
            ) : (
              <PlusGrey />
            )}

            <input
              ref={useEditProf.profImgInputRef}
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => useEditProf.onChangeProfImg(e)}
            />
          </button>

          <div className={styles.nicknameCont}>
            <div className={styles.inputBar}>
              <p className={styles.key}>닉네임설정</p>
              <input {...useEditProf.register("nickname")} />
            </div>

            <div className={styles.statusBar}>
              {useEditProf?.errors.nickname ? (
                <div className={`${styles.validBox} ${styles.err}`}>
                  <CautionRed />
                  <p>{useEditProf.errors.nickname.message}</p>
                </div>
              ) : useEditProf?.isExist && myProfile?.nickname !== useEditProf.watch("nickname") ? (
                <div className={`${styles.validBox}  ${styles.err}`}>
                  <CautionRed />
                  <p>이미 사용중인 닉네임입니다.</p>
                </div>
              ) : !useEditProf?.isExist && myProfile?.nickname !== useEditProf.watch("nickname") ? (
                <div className={`${styles.validBox}`}>
                  <CheckCircleBlue />
                  <p>가능한 닉네임 입니다.</p>
                </div>
              ) : (
                <></>
              )}

              <p className={styles.length}>
                <span className={styles.current}>
                  {useEditProf.watch("nickname")?.length || 0}자
                </span>{" "}
                / 최대 {useEditProf.nicknameMaxLen}자
              </p>
            </div>

            <div className={styles.tipBox}>
              <p className={styles.key}>TIP</p>

              <ul className={styles.tipList}>
                <li>한글/영문/숫자만 사용 가능합니다.</li>
                <li>닉네임은 1달에 1번 변경 가능합니다.</li>
              </ul>
            </div>
          </div>

          <div className={styles.msgCont}>
            <div className={styles.inputBox}>
              <p className={styles.key}>내 소개</p>

              <textarea {...useEditProf.register("description")} />
            </div>

            <div className={styles.statusBar}>
              <div
                className={`${styles.validBox} ${useEditProf.errors.description ? styles.err : ""}`}
              >
                {useEditProf.errors.description ? (
                  <>
                    <CautionRed />
                    <p>{useEditProf.errors.description.message}</p>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <p className={styles.length}>
                <span className={styles.current}>
                  {useEditProf.watch("description")?.length || 0}자
                </span>{" "}
                / 최대 {useEditProf.msgMaxLen}자
              </p>
            </div>
          </div>
        </form>
      </main>

      <footer className={styles.submitFooter}>
        <section className={styles.innerSec}>
          <button
            className={styles.submitBtn}
            onClick={useEditProf.handleSubmit(useEditProf.onSubmit)}
            disabled={
              useEditProf.errors.nickname?.type === "space" ||
              useEditProf.errors.nickname?.type === "enKrNum" ||
              useEditProf.errors.nickname?.type === "minLength" ||
              useEditProf.errors.nickname?.type === "maxLength" ||
              useEditProf.errors.nickname ||
              useEditProf.errors.description?.type === "maxLength" ||
              (useEditProf?.isExist && myProfile?.nickname !== useEditProf.watch("nickname"))
                ? true
                : false
            }
          >
            <p>프로필 수정</p>
          </button>
        </section>
      </footer>

      {useEditProf.isNotSavedPopup && (
        <>
          <ConfirmTitlePopup
            content={`닉네임 변경은 1개월에 1회만 변경 가능해요.`}
            confirmText="확인"
            confirmFunc={() => useEditProf.setIsNotSavedPopup(false)}
            zIndex={80}
          />
          <PopupBg bg zIndex={70} off={() => useEditProf.setIsNotSavedPopup(false)} />
        </>
      )}
    </>
  );
}
