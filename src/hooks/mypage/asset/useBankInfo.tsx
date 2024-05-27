import { useQuery } from "@tanstack/react-query";

import { getBankInfo } from "@api/bank";

export default function useBankInfo() {
  const { data } = useQuery({
    queryKey: ["getBankInfo"],
    queryFn: () => getBankInfo(),
  });

  return { data };
}
