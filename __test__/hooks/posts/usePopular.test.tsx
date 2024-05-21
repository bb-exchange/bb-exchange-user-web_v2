import mockNextRouter from "../../__mocks__/nextRouter";
import mockReactQuery from "../../__mocks__/reactQuery";

import { fetchArticles } from ".src/api/articles/articles";
import UsePopular from ".src/hooks/posts/usePopular";
import { expect, jest } from "@jest/globals";
import { useQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";

describe("usePopular", () => {
  mockNextRouter({
    opt: {
      query: { page: 0 },
    },
  });

  const wrapper = mockReactQuery;

  it("글 리스트 api 글이 존재", async () => {
    function usePopularArticles() {
      return useQuery({
        queryKey: ["popular", 0],
        queryFn: fetchArticles,
      });
    }

    const wrapper = mockReactQuery;

    const { result } = renderHook(usePopularArticles, {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data!.data.data.contents.length).toBeGreaterThan(0);
  });

  it("글 좋아요 버튼 작동", () => {
    let usePopular = {} as ReturnType<typeof UsePopular>;

    const CustomHookWrapper = () => {
      usePopular = UsePopular();
      return null;
    };

    const TestBtn = () => (
      <button data-testid={"testBtn"} onClick={(e) => usePopular.onClickFavBtn(e, 0)} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestBtn />
          </>
        ),
      }),
    );

    const testBtn = container.querySelector('[data-testid="testBtn"]');

    const favBfrClick = usePopular.dataList[0].isLike;
    fireEvent.click(testBtn!);
    const favAftClick = usePopular.dataList[0].isLike;

    expect(!favBfrClick === favAftClick).toBe(true);
  });
});
