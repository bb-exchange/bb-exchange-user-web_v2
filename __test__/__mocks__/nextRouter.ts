import * as nextRouter from "next/router";

export default function mockNextRouter() {
  (nextRouter as any).useRouter = jest.fn();
  (nextRouter as any).useRouter.mockImplementation(() => ({
    query: { page: 0 },
  }));
}
