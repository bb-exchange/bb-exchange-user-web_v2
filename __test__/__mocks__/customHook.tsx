import UseLatest from ".src/hooks/posts/useLatest";

const Wrapper = ({ getCustomHook }: any) => {
  getCustomHook(UseLatest());

  return null;
};

export const RenderCustomHook = (getCustomHook: any) => {
  return <Wrapper getCustomHook={getCustomHook} />;
};


