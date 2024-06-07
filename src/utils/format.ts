// 등락률 소수점 포맷
export const formatRate = (rate: number) => {
  // 소수점이 없을경우
  if (rate % 1 === 0) {
    return rate;
  } else {
    return Math.round(rate * 10) / 10;
  }
};
