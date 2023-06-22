import { D_postVerList } from ".src/data/post/D_postVersion";
import { useState } from "react";

export default function UsePostVerPopup() {
  const [verList, setVerList] = useState<IpostVersions[]>(D_postVerList);

  return { verList };
}
