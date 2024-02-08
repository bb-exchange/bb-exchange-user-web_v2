import ConfirmPopup from "../common/popup/confirmPopup";
import PopupBg from "../common/popupBg";
import styles from "./postEditConfirmPopup.module.scss";

const PostEditConfirmPopup = ({
  isListed,
  onClosePopup,
  onConfirmEdit,
}: {
  isListed: boolean;
  onConfirmEdit: () => void;
  onClosePopup: () => void;
}) => {
  return (
    <>
      <ConfirmPopup
        title="글을 수정하시겠습니까?"
        content={
          isListed ? (
            <div className={styles.container}>
              <p className={styles.content}>상장 글의 수정 주의사항</p>
              <p>1. 구매자는 모든 수정 버전을 볼 수 있어요!</p>
              <p>2. 1주일 동안 다시 수정할 수 없어요!</p>
              <p>3. 수정은 매출에 영향이 있을 수 있어요.</p>
            </div>
          ) : (
            "비상장 글은 자유롭게 수정이 가능해요!"
          )
        }
        confirmFunc={onConfirmEdit}
        cancelFunc={onClosePopup}
      />
      <PopupBg bg off={onClosePopup} />
    </>
  );
};

export default PostEditConfirmPopup;
