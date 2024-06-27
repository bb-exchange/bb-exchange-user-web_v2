import styles from "./sellerPost.module.scss";

import Link from "next/link";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/ko";

import HeartGrey from "@assets/icons/HeartGrey.svg";
import HeartRedO from "@assets/icons/HeartRedO.svg";

import { articles, updateArticleBookmark } from "@api/articles/articles";
import { ArticleData, Articles } from "@api/interface";

interface Iprops {
  data: ArticleData;
}

export default function SellerPost({ data }: Iprops) {
  console.log("data", data);

  function getDiffStyle(diff: number) {
    if (diff > 0) return styles.up;
    else if (diff < 0) return styles.dn;
  }

  const queryClient = useQueryClient();

  const articleId = data.articleInfo.articleId;
  const bookmarking = !data.articleInfo.interest;
  const { mutate: mutateArticle } = useMutation({
    mutationFn: ({ bookmarking, articleId }: { bookmarking: boolean; articleId: number }) =>
      updateArticleBookmark({ bookmarking, articleId }),
    onMutate: ({ bookmarking }) => {
      queryClient.setQueryData<Articles>([articles.name], (articles) => {
        data.articleInfo.interest = bookmarking;
        return articles;
      });
    },
  });

  // NOTE 찜하기 버튼 클릭
  const onClickFavBtn = () => {
    mutateArticle({ articleId, bookmarking });
  };

  return (
    <li className={styles.writePost}>
      <div className={styles.leftCont}>
        <div className={styles.infoCont}>
          <div className={styles.thumbBox}>
            <Link href={`/post/${data.articleInfo.articleId}`}>
              <div className={styles.titleBar}>
                <p className={`${styles.title} ${data.articleInfo.read ? styles.read : ""}`}>
                  {data.articleInfo.title}
                </p>

                <p className={styles.replyCount}>{`[${
                  (data.articleInfo.commentNum || 0) > 99 ? `+99` : data.articleInfo.commentNum || 0
                }]`}</p>
              </div>
            </Link>

            <div className={styles.infoBar}>
              <p className={styles.category}>{data.boardInfo.description}</p>・
              <p className={styles.createdAt}>{moment(data.articleInfo.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>

        <div className={styles.thumbnailImgBox}>
          {data.articleInfo.thumbnail ? <img src={data.articleInfo.thumbnail} alt="" /> : null}
        </div>
      </div>

      <div className={styles.rightCont}>
        {data.priceInfo.price ? (
          <div className={`${styles.priceBox} ${getDiffStyle(data.priceInfo.changeRate || 0)}`}>
            <div className={styles.diffBox}>
              <p>
                {`${(data.priceInfo.changeRate || 0) > 0 ? "+" : ""}${
                  data.priceInfo.changeRate || 0
                }% (${data.priceInfo.changeAmount || 0})`}
              </p>
            </div>

            <h1 className={styles.price}>{`${new Intl.NumberFormat().format(
              data.priceInfo.price || 0,
            )} P`}</h1>
          </div>
        ) : (
          <div className={styles.notListedBox}>
            <div className={styles.likeCountBox}>
              <p>{`좋아요 ${data.priceInfo.likeNum || 0}개`}</p>
            </div>

            <p className={styles.notListed}>비상장</p>
          </div>
        )}
        <button onClick={onClickFavBtn}>
          {data.articleInfo.interest ? <HeartRedO /> : <HeartGrey />}
        </button>
      </div>
    </li>
  );
}
