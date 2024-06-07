import {
  Comments,
  commentsByArticleId,
  CommentSortByType,
  createComment,
  deleteComment,
  updateComment,
  updateLikeComment,
} from ".src/api/comments";
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useComments = ({
  articleId,
  commentSortBy,
}: {
  articleId?: string;
  commentSortBy: CommentSortByType;
}) => {
  const queryClient = useQueryClient();

  // NOTE 댓글 목록 조회
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery({
    enabled: !!articleId,
    queryKey: [commentsByArticleId.name, { sortBy: commentSortBy }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      commentsByArticleId({
        articleId,
        page: pageParam,
        sortBy: commentSortBy,
      }),
    getNextPageParam: ({ hasNext, pageNumber }) => (hasNext ? pageNumber + 1 : null),
    placeholderData: keepPreviousData,
  });

  // NOTE 댓글 추가
  const { mutateAsync: newComment } = useMutation({
    mutationFn: createComment,
  });

  // NOTE 댓글 수정
  const { mutate: editComment } = useMutation({
    mutationFn: updateComment,
    onSuccess: (_, props) =>
      queryClient.setQueryData<InfiniteData<Comments>>(
        [commentsByArticleId.name, { sortBy: commentSortBy }],
        (data) => {
          if (data != null) {
            data.pages = data.pages.map((page) => ({
              ...page,
              contents: page.contents.map((content) =>
                content.commentId === props.commentId
                  ? {
                      ...content,
                      content: props.content,
                    }
                  : content,
              ),
            }));
          }
          return data;
        },
      ),
  });

  // NOTE 댓글 삭제
  const { mutate: removeComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, commentId) =>
      queryClient.setQueryData<InfiniteData<Comments>>(
        [commentsByArticleId.name, { sortBy: commentSortBy }],
        (data) => {
          if (data != null) {
            data.pages = data.pages.map((page) => ({
              ...page,
              contents: page.contents.map((content) =>
                content.commentId === commentId
                  ? {
                      ...content,
                      content: "삭제된 댓글입니다.",
                      isDeleted: true,
                    }
                  : content,
              ),
            }));
          }
          return data;
        },
      ),
  });

  // NOTE 댓글 좋아요 등록/해제
  const { mutateAsync: setLikeComment } = useMutation({
    mutationFn: updateLikeComment,
    onSuccess: (_, { isLike, commentId }) =>
      queryClient.setQueryData<InfiniteData<Comments>>(
        [commentsByArticleId.name, { sortBy: commentSortBy }],
        (data) => {
          if (data != null) {
            data.pages = data.pages.map((page) => ({
              ...page,
              contents: page.contents.map((content) =>
                content.commentId === commentId
                  ? {
                      ...content,
                      isLike,
                      likeCounts: isLike ? (content.likeCounts += 1) : (content.likeCounts -= 1),
                    }
                  : content,
              ),
            }));
          }
          return data;
        },
      ),
  });

  return {
    comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchComments,

    newComment,
    editComment,
    removeComment,

    setLikeComment,
  };
};
