import styles from "./alertCount.module.scss";

import Bell from "@assets/icons/Bell.svg";

type AlertCountProps = {
  count?: number;
};

const AlertCount = ({ count = 0 }: AlertCountProps) => {
  return (
    <div>
      <Bell />
      {count > 0 && <span className={styles.alertCount}>{count}</span>}
    </div>
  );
};

export default AlertCount;
