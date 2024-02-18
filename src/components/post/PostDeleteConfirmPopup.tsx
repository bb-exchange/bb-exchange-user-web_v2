import ConfirmPopup from "../common/popup/confirmPopup";
import PopupBg from "../common/popupBg";

const PostDeleteConfirmPopup = ({
  onClosePopup,
  onConfirmDelete,
}: {
  onConfirmDelete: () => void;
  onClosePopup: () => void;
}) => {
  return (
    <>
      <ConfirmPopup
        title="글을 삭제하시겠습니까?"
        content="삭제된 글은 복구할 수 없습니다."
        confirmFunc={onConfirmDelete}
        cancelFunc={onClosePopup}
      />
      <PopupBg bg off={onClosePopup} />
    </>
  );
};

export default PostDeleteConfirmPopup;
