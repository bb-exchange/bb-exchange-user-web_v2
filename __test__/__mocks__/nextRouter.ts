import * as nextRouter from "next/router";

interface Iprops {
  opt?: { [key: string]: any };
}

export default function mockNextRouter({ opt }: Iprops) {
  (nextRouter as any).useRouter = jest.fn();
  (nextRouter as any).useRouter.mockImplementation(() => ({
    query: {},
    ...opt,
  }));
}
