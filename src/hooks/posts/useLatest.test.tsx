import { expect, jest } from "@jest/globals";
import { fireEvent, render, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as nextRouter from "next/router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import UseLatest from "./useLatest";
import { waitFor } from "@testing-library/react";
import { fetchArticles } from ".src/api/articles/articles";

describe("useLatest", () => {
  (nextRouter as any).useRouter = jest.fn();
  (nextRouter as any).useRouter.mockImplementation(() => ({
    query: { page: 0 },
  }));

  const queryClient = new QueryClient();

  it("글 리스트 api 글이 존재", async () => {
    function getLateArticles() {
      return useQuery({
        queryKey: ["latest", 0],
        queryFn: fetchArticles,
      });
    }

    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(getLateArticles, {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data!.data.data.contents.length).toBeGreaterThan(0);
  });

  it("글 좋아요 버튼 작동", () => {
    let results = {} as ReturnType<typeof UseLatest>;

    const Wrapper = () => {
      results = UseLatest();
      return null;
    };

    const TestBtn = () => (
      <button onClick={(e) => results.onClickFavBtn(e, 0)}></button>
    );

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Wrapper />
        <TestBtn />
      </QueryClientProvider>
    );

    const testBtn = container.getElementsByTagName("button")[0];

    const favBfrClick = results.dataList[0].isLike;
    fireEvent.click(testBtn);
    const favAftClick = results.dataList[0].isLike;

    expect(!favBfrClick === favAftClick).toBe(true);
  });
});
