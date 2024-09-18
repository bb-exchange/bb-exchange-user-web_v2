import "./like.scss";
import cn from "classnames";

export default function Like() {
  return (
    <div className="like">
      <LikeButton status="off" />
      <LikeButton status="up" />
      <LikeButton status="down" />
    </div>
  );
}

type LikeButtonProps = {
  status?: "off" | "up" | "down";
};

// TODO: icon, typography 적용 필요
export const LikeButton = ({ status = "off" }: LikeButtonProps) => {
  return (
    <div className={cn("like-button", `like-status--${status}`)}>
      <div>👍</div>
      <span>+1P</span>
    </div>
  );
};
