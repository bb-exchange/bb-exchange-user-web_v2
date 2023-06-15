import CommonHeader from ".src/components/common/header/commonHeader";
import styles from "./postScreen.module.scss";
import CommonFooter from ".src/components/common/commonFooter";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from ".src/api/post/post";

export default function Post() {
  const router = useRouter();

  console.log(router.query.id);

  const { data } = useQuery(["post", router.query.id], fetchPost, {
    retry: false,
  });

  return (
    <>
      <CommonHeader />
      <main className={styles.postScreen}></main>
      <CommonFooter />
    </>
  );
}
