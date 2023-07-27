import usePost from "./usePost";

interface Iprops {
  usePost: ReturnType<typeof usePost>;
}

export default function UseCompPayPopup({ usePost }: Iprops) {
  function off() {
    usePost.setCompPayPopup(false);
  }

  function onClickSeeNowBtn() {
    usePost.setUnLimited(true);
    usePost.setCompPayPopup(false);
  }

  return { off, onClickSeeNowBtn };
}
