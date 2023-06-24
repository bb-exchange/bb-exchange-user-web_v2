import { D_mypageNavList } from ".src/data/mypage/D_mypage";

export default function UseMypageNavAside() {
  const navList: mypageNavs[] = D_mypageNavList;

  return { navList };
}
