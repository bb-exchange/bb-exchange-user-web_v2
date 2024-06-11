import styles from "./SubHeader.module.scss";

import Warning from ".assets/icons/Warning.svg";

export const SubHeader: React.FC = () => {
  return (
    <div className={`bg-primary4 ${styles.container}`}>
      <p className="p3 color-primary-bg2">
        <Warning />
        <span>
          캡쳐한 스크린샷을 온/오프라인에 유포/공유할 경우{" "}
          <span className="color-red1">법적인 제재</span>를 받을 수 있습니다.
        </span>
      </p>
    </div>
  );
};
