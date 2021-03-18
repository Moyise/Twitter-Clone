const timeDifference = (current: any, previous: any) => {
  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now";

    return Math.round(elapsed / 1000) + " s";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " m";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " h";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) < 2
      ? Math.round(elapsed / msPerDay) + " day"
      : Math.round(elapsed / msPerDay) + " days";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months";
  } else {
    return Math.round(elapsed / msPerYear) + " years";
  }
};

export default timeDifference;
