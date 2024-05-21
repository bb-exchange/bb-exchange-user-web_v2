import { useState } from "react";

import { D_postVerList } from ".src/data/post/D_postVersion";

export default function UsePostVerPopup() {
  const [verList, setVerList] = useState<IpostVersions[]>(D_postVerList);

  return { verList };
}
