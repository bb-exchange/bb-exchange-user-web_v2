import Lastest from "./latest";
import Popular from "./mypage/popular";

export default function Home() {
  return <Lastest />;
  // return <Popular />;
}

export function getStaticProps() {
  return { props: { commonLayout: true, commonSort: "최신" } };
  // return { props: { commonLayout: true, commonSort: "인기" } };
}
