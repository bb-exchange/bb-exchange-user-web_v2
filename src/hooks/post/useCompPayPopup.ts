import UsePost from "./usePost";

interface Iprops {
  usePost: ReturnType<typeof UsePost>;
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
