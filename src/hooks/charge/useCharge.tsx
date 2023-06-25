import { D_chargeList } from ".src/data/charge/D_charge";

export default function UseCharge() {
  const chargeList: number[] = D_chargeList;

  return { chargeList };
}
