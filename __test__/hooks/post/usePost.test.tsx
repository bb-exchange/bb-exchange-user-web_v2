import mockNextRouter from "../../../__test__/__mocks__/nextRouter";
import mockReactQuery from "../../../__test__/__mocks__/reactQuery";
import usePost from "./usePost";

import { expect } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";

describe("usePost", () => {
  mockNextRouter({});

  it("onClickLikeBtn", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestBtnDn = () => (
      <button data-testid={"testBtnDn"} onClick={() => UsePost.onClickLikeBtn(-1)} />
    );

    const TestBtnUp = () => (
      <button data-testid={"testBtnUp"} onClick={() => UsePost.onClickLikeBtn(1)} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestBtnDn />
            <TestBtnUp />
          </>
        ),
      }),
    );

    const testBtnDn = container.querySelector('[data-testid="testBtnDn"]');
    const testBtnUp = container.querySelector('[data-testid="testBtnUp"]');

    expect(UsePost.like).toBe(0);

    fireEvent.click(testBtnDn!);
    expect(UsePost.like).toBe(-1);

    fireEvent.click(testBtnUp!);
    expect(UsePost.like).toBe(1);

    fireEvent.click(testBtnUp!);
    expect(UsePost.like).toBe(0);
  });

  it("onClickReportPostBtn", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestMorePopupBtn = () => (
      <button data-testid={"testMorePopupBtn"} onClick={() => UsePost.setMorePopup(true)} />
    );
    const TestReportBtn = () => (
      <button data-testid={"testReportBtn"} onClick={UsePost.onClickReportPostBtn} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestMorePopupBtn />
            <TestReportBtn />
          </>
        ),
      }),
    );

    const testMorePopupBtn = container.querySelector('[data-testid="testMorePopupBtn"]');
    const testReportBtn = container.querySelector('[data-testid="testReportBtn"]');

    fireEvent.click(testMorePopupBtn!);
    expect(UsePost.morePopup).toBe(true);

    fireEvent.click(testReportBtn!);
    expect(UsePost.morePopup).toBe(false);
    expect(UsePost.reportPostPopup).toBe(true);
  });

  it("onSuccessReportPost", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestReportBtn = () => (
      <button data-testid={"testReportBtn"} onClick={UsePost.onClickReportPostBtn} />
    );

    const TestSuccessReportPostBtn = () => (
      <button data-testid={"testSuccessReportPostBtn"} onClick={UsePost.onSuccessReportPost} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestReportBtn />
            <TestSuccessReportPostBtn />
          </>
        ),
      }),
    );

    const testReportBtn = container.querySelector('[data-testid="testReportBtn"]');
    const testSuccessReportPostBtn = container.querySelector(
      '[data-testid="testSuccessReportPostBtn"]',
    );

    fireEvent.click(testReportBtn!);
    expect(UsePost.reportPostPopup).toBe(true);

    fireEvent.click(testSuccessReportPostBtn!);
    expect(UsePost.reportPostPopup).toBe(false);
    expect(UsePost.compReportPopup).toBe(true);
  });

  it("onClickReportUserBtn", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestMorePopupBtn = () => (
      <button data-testid={"testMorePopupBtn"} onClick={() => UsePost.setMorePopup(true)} />
    );
    const TestReportBtn = () => (
      <button data-testid={"testReportBtn"} onClick={UsePost.onClickReportUserBtn} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestMorePopupBtn />
            <TestReportBtn />
          </>
        ),
      }),
    );

    const testMorePopupBtn = container.querySelector('[data-testid="testMorePopupBtn"]');
    const testReportBtn = container.querySelector('[data-testid="testReportBtn"]');

    fireEvent.click(testMorePopupBtn!);
    expect(UsePost.morePopup).toBe(true);

    fireEvent.click(testReportBtn!);
    expect(UsePost.morePopup).toBe(false);
    expect(UsePost.reportUserPopup).toBe(true);
  });

  it("onSuccessReportUser", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestReportBtn = () => (
      <button data-testid={"testReportBtn"} onClick={UsePost.onClickReportUserBtn} />
    );

    const TestSuccessReportUserBtn = () => (
      <button data-testid={"testSuccessReportUserBtn"} onClick={UsePost.onSuccessReportUser} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestReportBtn />
            <TestSuccessReportUserBtn />
          </>
        ),
      }),
    );

    const testReportBtn = container.querySelector('[data-testid="testReportBtn"]');
    const testSuccessReportUserBtn = container.querySelector(
      '[data-testid="testSuccessReportUserBtn"]',
    );

    fireEvent.click(testReportBtn!);
    expect(UsePost.reportUserPopup).toBe(true);

    fireEvent.click(testSuccessReportUserBtn!);
    expect(UsePost.reportUserPopup).toBe(false);
    expect(UsePost.compReportPopup).toBe(true);
  });

  it("onClickHideUserPostBtn", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestMorePopupBtn = () => (
      <button data-testid={"testMorePopupBtn"} onClick={() => UsePost.setMorePopup(true)} />
    );

    const TestHideBtn = () => (
      <button data-testid={"testHideBtn"} onClick={UsePost.onClickHideUserPostBtn} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestMorePopupBtn />
            <TestHideBtn />
          </>
        ),
      }),
    );

    const testMorePopupBtn = container.querySelector('[data-testid="testMorePopupBtn"]');
    const testHideBtn = container.querySelector('[data-testid="testHideBtn"]');

    fireEvent.click(testMorePopupBtn!);
    expect(UsePost.morePopup).toBe(true);

    fireEvent.click(testHideBtn!);
    expect(UsePost.morePopup).toBe(false);
    expect(UsePost.hideUserPostPopup).toBe(true);
  });

  it("onSuccessHideUserPost", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestHideBtn = () => (
      <button data-testid={"testHideBtn"} onClick={UsePost.onClickHideUserPostBtn} />
    );

    const TestSuccessReportUserBtn = () => (
      <button data-testid={"testSuccessHideBtn"} onClick={UsePost.onSuccessHideUserPost} />
    );

    const { container } = render(
      mockReactQuery({
        children: (
          <>
            <CustomHookWrapper />
            <TestHideBtn />
            <TestSuccessReportUserBtn />
          </>
        ),
      }),
    );

    const testHideBtn = container.querySelector('[data-testid="testHideBtn"]');
    const testSuccessHideUserPostBtn = container.querySelector(
      '[data-testid="testSuccessHideBtn"]',
    );

    fireEvent.click(testHideBtn!);
    expect(UsePost.hideUserPostPopup).toBe(true);

    fireEvent.click(testSuccessHideUserPostBtn!);
    expect(UsePost.hideUserPostPopup).toBe(false);
    expect(UsePost.compHideUserPostPopup).toBe(true);
  });

  it("onClickFavBtn", () => {
    let UsePost = {} as ReturnType<typeof usePost>;

    const CustomHookWrapper = () => {
      UsePost = usePost();
      return null;
    };

    const TestBtn = () => <button data-testid={"testBtn"} onClick={UsePost.onClickFavBtn} />;

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

    expect(UsePost.isLike).toBe(false);

    fireEvent.click(testBtn!);
    expect(UsePost.isLike).toBe(true);
  });
});
