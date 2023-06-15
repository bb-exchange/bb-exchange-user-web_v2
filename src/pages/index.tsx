import Popular from "./popular";

export default function Home() {
  return <Popular />;
}

export function getStaticProps() {
  return { props: { commonLayout: true, commonSort: "인기" } };
}
