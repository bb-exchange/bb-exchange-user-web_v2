import styles from "./reportSellerPopup.module.scss";

import CheckCircle from "@assets/icons/CheckCircle.svg";
import CheckCircleBlueO from "@assets/icons/CheckCircleBlueO.svg";
import X from "@assets/icons/X.svg";

import UseSeller from "@hooks/seller/useSeller";

interface IProps {
  off: Function;
}

const ReportSellerPopup = ({ off }: IProps) => {
  const hook = UseSeller();

  return (
    <section className={styles.reportUserPopup}>
      <article className={styles.titleBar}>
        <h1 className={styles.title}>사용자 신고하기</h1>

        <button className={styles.exitBtn} onClick={() => off()}>
          <X />
        </button>
      </article>

      <article className={styles.contArea}>
        <div className={styles.topBar}>
          <h1 className={styles.key}>신고사유를 알려주세요!</h1>

          <p className={styles.explain}>
            타당한 근거 없이 신고된 내용은 관리자 확인 후 반영되지 않을 수 있습니다.
          </p>
        </div>

        <div className={styles.reportCont}>
          <form onSubmit={hook.reportForm.handleSubmit(hook.onReportSubmit)}>
            <div className={styles.scrollBox}>
              <ul className={styles.categoryList}>
                {hook?.reportReasons?.length > 0 &&
                  hook?.reportReasons?.map(({ desc, code }: { desc: string; code: string }) => (
                    <li
                      key={code}
                      className={`${code === hook.reportForm.watch("reason") ? styles.on : ""}`}
                      onClick={() => hook.reportForm.setValue("reason", code)}
                    >
                      <CheckCircle className={styles.offSvg} />
                      <CheckCircleBlueO className={styles.onSvg} />
                      <p>{desc}</p>
                    </li>
                  ))}
              </ul>
            </div>

            <textarea
              placeholder="신고 내용을 입력해주세요"
              {...hook.reportForm.register("content", { required: true })}
            />

            <button
              className={styles.submitBtn}
              disabled={!hook.reportForm.formState.isValid}
              type="submit"
            >
              <p>신고하기</p>
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default ReportSellerPopup;
