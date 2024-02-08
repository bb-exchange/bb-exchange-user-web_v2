import { Provider } from "react-redux";
import { makeStore } from ".src/app/store";

export default function mockReactRedux({ children }: any) {
  const store = makeStore();

  return <Provider store={store}>{children}</Provider>;
}
