import UseEditProf from ".src/hooks/mypage/editProf/useEditProf";
import styles from "./editProf.module.scss";
import CommonHeader from ".src/components/common/header/commonHeader";
import PlusGrey from ".assets/icons/PlusGrey.svg";
import CautionRed from ".assets/icons/CautionRed.svg";
import CheckCircleBlue from ".assets/icons/CheckCircleBlue.svg";
import Image from "next/image";
import useGetMyProfile from ".src/hooks/common/useGetProfile";
import { useEffect } from "react";

export default function EditProf() {
  const useEditProf = UseEditProf();
  const myProfile = useGetMyProfile();

  useEffect(() => {
    if (myProfile) {
      useEditProf.setValue("nickname", myProfile.nickname);
      useEditProf.setValue("description", myProfile.description);
    }
  }, [myProfile]);

  return (
    <>
      <CommonHeader />

      <main className={styles.editProf}>
        <form
          id="Form"
          // onSubmit={useEditProf.handleSubmit(useEditProf.onSubmit)}
        >
          <button
            type="button"
            className={styles.profImgBtn}
            onClick={() => useEditProf.profImgInputRef.current?.click()}
          >
            {useEditProf.watch("profImg") ? (
              <Image
                className={styles.profImg}
                src={useEditProf.watch("profImg") ?? ""}
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
              <div
                className={`${styles.validBox} ${
                  useEditProf.errors.nickname ? styles.err : ""
                }`}
              >
                {useEditProf.errors.nickname && (
                  <>
                    <CautionRed />
                    <p>{useEditProf.errors.nickname.message}</p>
                  </>
                )}

                {/*                 
                  <>
                    <CheckCircleBlue />
                    <p>가능한 닉네임 입니다.</p>
                  </>
                 */}
              </div>

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
                className={`${styles.validBox} ${
                  useEditProf.errors.description ? styles.err : ""
                }`}
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
          >
            <p>프로필 수정</p>
          </button>
        </section>
      </footer>
    </>
  );
}
