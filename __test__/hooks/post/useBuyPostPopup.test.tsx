import { expect } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";
import UseBuyPostPopup from "../../../src/hooks/post/useBuyPostPopup";
import usePost from "../../../src/hooks/post/usePost";
import mockNextRouter from "../../__mocks__/nextRouter";
import mockReactQuery from "../../__mocks__/reactQuery";

describe("useBuyPostPopup", () => {
  mockNextRouter({});

  it("약관 동의 버튼을 눌렀을때", () => {
    let useBuyPostPopup = {} as ReturnType<typeof UseBuyPostPopup>;

    const CustomHookWrapper = () => {
      useBuyPostPopup = UseBuyPostPopup({ usePost: usePost() });
      return null;
    };

    const TestBtn = () => (
      <button
        data-testid={"testBtn"}
        onClick={useBuyPostPopup.onClickAgreeTermBtn}
      />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestBtn />
          </>
        ),
      })
    );

    const testBtn = container.querySelector('[data-testid="testBtn"]');

    const favBfrClick = useBuyPostPopup.agreeTerm;
    fireEvent.click(testBtn!);
    const favAftClick = useBuyPostPopup.agreeTerm;

    expect(!favBfrClick === favAftClick).toBe(true);
  });

  it("결제하기 버튼 눌렀을때 state 변환", () => {
    let useBuyPostPopup = {} as ReturnType<typeof UseBuyPostPopup>;
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      useBuyPostPopup = UseBuyPostPopup({ usePost: UsePost });
      return null;
    };

    const TestBtn = () => (
      <button
        data-testid={"testBtn"}
        onClick={useBuyPostPopup.onClickConfirmBtn}
      />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestBtn />
          </>
        ),
      })
    );

    const testBtn = container.querySelector('[data-testid="testBtn"]');

    fireEvent.click(testBtn!);

    expect(UsePost.buyPopup).toBe(false);
    expect(UsePost.compPayPopup).toBe(true);
  });
});
