import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import ContainedBtn from ".src/components/Buttons/ContainedBtn";

interface Inputs {
  nickname: string;
}

const UserNickname = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  return (
    <div id={styles.userNickname}>
      <div className={styles.contentBox}>
        <h2 className={styles.title}>
          <span className={styles.blueText}>사용할 닉네임</span>을 입력해주세요
        </h2>
        <form>
          <section className={styles.inputWrap}>
            <div className={styles.inputLayout}>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                {...register("nickname", {
                  required: true,
                })}
              />
            </div>

            <ContainedBtn
              text={"인증받기"}
              disabled={watch("nickname")?.length > 0 ? false : true}
              // onClick={handleSubmit(sendSecretCode)}
            />
          </section>
        </form>
      </div>
    </div>
  );
};

export default UserNickname;
export function getStaticProps() {
  return { props: { navBar: true } };
}
