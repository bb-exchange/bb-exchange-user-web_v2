interface myTermIncomes {
  startDate: Date;
  endDate: Date;
  amount: number;
}

interface myContentIncomes {
  title: String;
  category: string;
  createdAt: Date;
  amount: number;
}

interface myWithdraws {
  createdAt: Date;
  status: "출금 진행중" | "출금 완료";
  amount: number;
}
