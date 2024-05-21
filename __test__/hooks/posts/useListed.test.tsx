import mockNextRouter from "../../../__test__/__mocks__/nextRouter";
import mockReactQuery from "../../../__test__/__mocks__/reactQuery";

import { fetchArticles } from ".src/api/articles/articles";
import UseListed from ".src/hooks/posts/useListed";
import { expect, jest } from "@jest/globals";
import { useQuery } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { fireEvent, render, renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";

describe("useListed", () => {
  mockNextRouter({
    opt: {
      query: { page: 0 },
    },
  });

  it("글 리스트 api 글이 존재", async () => {
    function useLateArticles() {
      return useQuery({
        queryKey: ["listed", 0],
        queryFn: fetchArticles,
      });
    }

    const wrapper = mockReactQuery;

    const { result } = renderHook(useLateArticles, {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data!.data.data.contents.length).toBeGreaterThan(0);
  });

  it("글 좋아요 버튼 작동", () => {
    let useListed = {} as ReturnType<typeof UseListed>;

    const CustomHookWrapper = () => {
      useListed = UseListed();
      return null;
    };

    const TestBtn = () => (
      <button data-testid={"testBtn"} onClick={(e) => useListed.onClickFavBtn(e, 0)} />
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

    const favBfrClick = useListed.dataList[0].isLike;
    fireEvent.click(testBtn!);
    const favAftClick = useListed.dataList[0].isLike;

    expect(!favBfrClick === favAftClick).toBe(true);
  });
});
