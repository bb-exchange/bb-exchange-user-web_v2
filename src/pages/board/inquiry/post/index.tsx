import InquiryLayout from ".src/components/inquiry/InquiryLayout";
import { useRouter } from "next/router";
import styles from "./postInquiry.module.scss";
import ContainedBtn from ".src/components/Buttons/ContainedBtn";
import { useState } from "react";
import usePostInquiry from ".src/hooks/board/usePostInquiry";
import IconRedCaution from "../../../../../public/assets/icons/RedCaution.svg";
import LinkPopup from ".src/components/common/popup/linkPopup";
import PopupBg from ".src/components/common/popupBg";
import ConfirmPopup from ".src/components/common/popup/confirmPopup";
const PostInquiry = () => {
  const router = useRouter();

  const {
    watch,
    register,
    handleSubmit,
    onSubmit,
    errors,
    disable,
    openCompletePopup,
    setOpenCompletePopup,
    openBlockPopup,
    setOpenBlockPopup,
  } = usePostInquiry();

  return (
    <div>
      <InquiryLayout>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.postInquiry}>
          <h3>제목을 입력해주세요</h3>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            maxLength={40}
            {...register("title", {
              required: "제목 입력은 필수입니다",
              maxLength: 40,
            })}
          />
          {errors?.title && (
            <p className={styles.errorMessage}>
              <IconRedCaution />
              <span>{errors?.title?.message}</span>
            </p>
          )}
          <span className={styles.numOfChar}>
            {watch("title")?.length ?? 0}자 / 최대 40자
          </span>
          <h3>내용을 입력해주세요</h3>
          <textarea
            placeholder="문의 내용을 최소 10자 이상 입력해주세요."
            {...register("content", {
              required: true,
              minLength: {
                value: 10,
                message: "최소 10자 이상으로 입력해주세요",
              },
            })}
          ></textarea>
          {(errors?.content?.type === "minLength" || errors?.content) && (
            <p className={styles.errorMessage}>
              <IconRedCaution />
              <span>{"최소 10자 이상으로 입력해주세요"}</span>
            </p>
          )}
          <div className={styles.btnWrap}>
            <ContainedBtn text={"문의하기"} disabled={disable ? true : false} />
          </div>
        </form>
      </InquiryLayout>
      {openCompletePopup && (
        <>
          <LinkPopup
            msg={"1:1 문의 등록이 완료되었습니다."}
            linkTo={"/board/inquiry"}
            btnText={"내 문의내역 보기"}
          />
          <PopupBg bg off={() => setOpenCompletePopup(false)} />
        </>
      )}
      {openBlockPopup && (
        <>
          <ConfirmPopup
            cancelFunc={() => setOpenBlockPopup(false)}
            confirmFunc={() => {
              setOpenBlockPopup(false);
              router.push("/setting");
            }}
            content={
              <>
                <span className={styles.boldText}>
                  1:1문의를 그만두시겠습니까?
                </span>
                <span>
                  1:1문의를 그만둘 시<br />
                  작성했던 내용은 저장되지 않습니다
                </span>
              </>
            }
          />
          <PopupBg bg off={() => setOpenBlockPopup(false)} />
        </>
      )}
    </div>
  );
};

export default PostInquiry;

export function getStaticProps() {
  return { props: { commonLayout: true } };
}
