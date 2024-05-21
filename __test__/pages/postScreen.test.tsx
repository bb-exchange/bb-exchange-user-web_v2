import Post from "../../src/pages/post/[id]";
import mockNextRouter from "../__mocks__/nextRouter";
import mockReactQuery from "../__mocks__/reactQuery";
import mockReactRedux from "../__mocks__/reactRedux";

import { describe, expect } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";

describe("postScreen", () => {
  mockNextRouter({});
  jest.mock("react-redux", () => {
    return {
      ...jest.requireActual("react-redux"),
      useSelector: jest.fn().mockImplementation(() => ({ isSignedIn: false })),
      useDispatch: () => jest.fn(),
    };
  });

  it("screenTest", () => {
    const { container } = render(
      mockReactRedux({
        children: mockReactQuery({
          children: <Post />,
        }),
      }),
    );

    const thumbGrey = container.querySelector('[data-testid="thumbGrey"]');
    expect(thumbGrey).toBeDefined();

    const thumbRed = container.querySelector('[data-testid="thumbRed"]');
    expect(thumbRed).toBeDefined();
  });
});
