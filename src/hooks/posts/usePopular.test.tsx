import { expect, jest } from "@jest/globals";
import { fireEvent, render, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as nextRouter from "next/router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import UsePopular from "./usePopular";
import { waitFor } from "@testing-library/react";
import { fetchArticles } from ".src/api/articles/articles";
import mockNextRouter from "../../../__test__/__mocks__/nextRouter";
import mockReactQuery from "../../../__test__/__mocks__/reactQuery";

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
    let results = {} as ReturnType<typeof UsePopular>;

    const Wrapper = () => {
      results = UsePopular();
      return null;
    };

    const TestBtn = () => {
      return <button onClick={(e) => results.onClickFavBtn(e, 0)}></button>;
    };

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <Wrapper />
            <TestBtn />
          </>
        ),
      })
    );

    const testBtn = container.getElementsByTagName("button")[0];

    const favBfrClick = results.dataList[0].isLike;
    fireEvent.click(testBtn);
    const favAftClick = results.dataList[0].isLike;

    expect(!favBfrClick === favAftClick).toBe(true);
  });
});
