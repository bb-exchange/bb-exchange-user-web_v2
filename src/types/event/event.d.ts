interface D_eventList {
  id: number;
  name: string;
  title?: string;
  image?: string;
  type?: "plain" | "replace";
  path?: string;
}

interface GetEventsRes {
  data: {
    dailyEventList: DailyEvent[];
    lastAttendanceTime: string;
    remainingAmount: number;
  };
}

interface DailyEvent {
  id: number;
  name: string;
  amount: number;
  limitPerDay: number;
  useYn: string;
  attainment: number;
  statusCount: number;
}

interface IsDailyEventSuccessRes {
  data: {
    eventType: string;
    done: true;
  };
}
