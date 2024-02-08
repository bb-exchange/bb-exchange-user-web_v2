import { useRouter } from "next/router";
import styles from "./index.module.scss";

export default function Index() {
  const { push } = useRouter();

  return (
    <ul className={styles.index}>
      <li onClick={() => push({ pathname: "/auth/apple" })}>
        apple 소셜 로그인 로딩화면
      </li>

      <li onClick={() => push({ pathname: "/auth/duplicate-social-account" })}>
        이미 가입한 계정이 있어요
      </li>

      <li onClick={() => push({ pathname: "/auth/google" })}>
        google 소셜 로그인 로딩화면
      </li>

      <li onClick={() => push({ pathname: "/auth/kakao" })}>
        kakao 소셜 로그인 로딩화면
      </li>

      <li onClick={() => push({ pathname: "/auth/mobile-authentication" })}>
        휴대폰 인증을 해주세요
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/auth/mobile-authentication",
            query: {
              openExceedPopup: true,
            },
          })
        }
      >
        휴대폰 인증을 해주세요 / 인증문자 횟수 초과
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/auth/mobile-authentication",
            query: {
              openErrSecretPopup: true,
            },
          })
        }
      >
        휴대폰 인증을 해주세요 / 인증문자 횟수 초과
      </li>

      <li onClick={() => push({ pathname: "/auth/register" })}>
        사용할 닉네임을 입력해주세요
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/auth/register",
            query: {
              openConfirmPopup: true,
            },
          })
        }
      >
        사용할 닉네임을 입력해주세요 / 회원가입이 완료되지 않았습니다!
      </li>

      <li onClick={() => push({ pathname: "/auth/signin" })}>로그인 랜딩</li>

      <li onClick={() => push({ pathname: "/auth/signup-completion" })}>
        서비스 가입을 축하드려요!
      </li>

      <li onClick={() => push({ pathname: "/auth/terms-agreement" })}>
        서비스 이용동의
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/auth/terms-agreement",
            query: {
              openCautionPopUp: true,
            },
          })
        }
      >
        서비스 이용동의 / 비법거래소는 만 14세 이상만
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/auth/terms-agreement",
            query: {
              openTextPopUp: true,
            },
          })
        }
      >
        서비스 이용동의 / 마케팅 정보 수신 동의
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/auth/terms-agreement",
            query: {
              openTextPopUp: true,
            },
          })
        }
      >
        서비스 이용동의 / 마케팅 정보 수신 동의
      </li>

      <li onClick={() => push({ pathname: "/board/faq" })}>FAQ</li>

      <li onClick={() => push({ pathname: "/board/faq/0" })}>FAQ 상세</li>

      <li onClick={() => push({ pathname: "/board/inquiry" })}>1:1 문의</li>

      <li onClick={() => push({ pathname: "/board/inquiry/post" })}>
        1:1 문의 등록
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/board/inquiry/post",
            query: { openCompletePopup: true },
          })
        }
      >
        1:1 문의 등록 / 1:1 문의 등록이 완료되었습니다.
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/board/inquiry/post",
            query: { openBlockPopup: true },
          })
        }
      >
        1:1 문의 등록 / 1:1문의를 그만두시겠습니까?
      </li>

      <li onClick={() => push({ pathname: "/board/inquiry" })}>
        1:1 문의 상세
      </li>

      <li onClick={() => push({ pathname: "/board/notice" })}>공지사항</li>

      <li onClick={() => push({ pathname: "/board/notice/0" })}>
        공지사항 상세
      </li>

      <li onClick={() => push({ pathname: "/charge" })}>포인트 충전</li>

      <li onClick={() => push({ pathname: "/edit" })}>글 수정</li>

      <li
        onClick={() =>
          push({
            pathname: "/edit",
            query: {
              selCategoryPopup: true,
            },
          })
        }
      >
        글 수정 / 카테고리
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/edit",
            query: {
              draftsPopup: true,
              draftsList: true,
            },
          })
        }
      >
        글 수정 / 임시저장 글
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/edit",
            query: {
              draftsPopup: true,
            },
          })
        }
      >
        글 수정 / 임시저장 글 (none)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/edit",
            query: {
              delDraftPopup: true,
            },
          })
        }
      >
        글 수정 / 임시저장글을 삭제하시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/edit",
            query: {
              loadDraftPopup: true,
            },
          })
        }
      >
        글 수정 / 선택한 글을 불러오시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/edit",
            query: {
              confirmSaveEditPopup: true,
            },
          })
        }
      >
        글 수정 / 수정을 완료하시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/edit",
            query: {
              compEditPopup: true,
            },
          })
        }
      >
        글 수정 / 글 수정이 완료되었습니다.
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/enroll",
          })
        }
      >
        글 등록
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/enroll/term",
          })
        }
      >
        글 등록 / 윤리서약
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/latest",
          })
        }
      >
        글 리스트(최신)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/listed",
          })
        }
      >
        글 리스트(상장)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage",
          })
        }
      >
        마이페이지
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/asset",
          })
        }
      >
        마이페이지 - 자산
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/asset",
            query: {
              withdrawPopup: true,
            },
          })
        }
      >
        마이페이지 - 자산 / 출금하기
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/asset",
            query: {
              compPopup: true,
            },
          })
        }
      >
        마이페이지 - 자산 / 출금 예정
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/edit_prof",
          })
        }
      >
        마이페이지 - 프로필 수정
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/like",
          })
        }
      >
        마이페이지(찜한 글)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/point",
          })
        }
      >
        마이페이지 - 포인트
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/buy",
          })
        }
      >
        마이페이지(구매한 글)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/mypage/write",
          })
        }
      >
        마이페이지(작성한 글)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/popular",
          })
        }
      >
        글 리스트(인기)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/post/0",
          })
        }
      >
        글 상세페이지
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/post/0",
            query: {
              buyPopup: true,
              point: 12000,
            },
          })
        }
      >
        글 상세페이지 (구매하기 팝업)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/post/0",
            query: {
              buyPopup: true,
            },
          })
        }
      >
        글 상세페이지 (구매하기 팝업, 포인트 0)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/post/0",
            query: {
              compPayPopup: true,
            },
          })
        }
      >
        글 상세페이지 (결제 완료 팝업)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/post/0",
            query: {
              unLimited: true,
            },
          })
        }
      >
        글 상세페이지 (구매된 글)
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/setting",
          })
        }
      >
        설정
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/setting",
            query: {
              alertPopup: true,
            },
          })
        }
      >
        설정 / 활동 알림을 끄시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/setting",
            query: {
              marketingPopup: true,
            },
          })
        }
      >
        설정 / 마케팅 알림을 끄시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/setting",
            query: {
              logOutPopup: true,
            },
          })
        }
      >
        설정 / 로그아웃하시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/setting",
            query: {
              withdrawPopup: true,
            },
          })
        }
      >
        설정 / 계정을 탈퇴하시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/user/blocked",
          })
        }
      >
        차단 사용자 관리
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/user/blocked",
            query: {
              openPopup: true,
            },
          })
        }
      >
        차단 사용자 관리 / 사용자 차단을 해제하시겠습니까?
      </li>

      <li
        onClick={() =>
          push({
            pathname: "/user/hidden",
          })
        }
      >
        숨김 유저 관리
      </li>
    </ul>
  );
}
