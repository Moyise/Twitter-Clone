export const timeDifference = (current: any, previous: any) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

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

export const postDate = (time: Date) => {
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const year = time.getFullYear();

  if (month === 1) {
    return "Jan " + day + ", " + year;
  } else if (month === 2) {
    return "Feb " + day + ", " + year;
  } else if (month === 3) {
    return "Mar " + day + ", " + year;
  } else if (month === 4) {
    return "Apr " + day + ", " + year;
  } else if (month === 5) {
    return "May " + day + ", " + year;
  } else if (month === 6) {
    return "Jun " + day + ", " + year;
  } else if (month === 7) {
    return "Jul " + day + ", " + year;
  } else if (month === 8) {
    return "Aug " + day + ", " + year;
  } else if (month === 9) {
    return "Sep " + day + ", " + year;
  } else if (month === 10) {
    return "Oct " + day + ", " + year;
  } else if (month === 11) {
    return "Nov " + day + ", " + year;
  } else if (month === 12) {
    return "Dec " + day + ", " + year;
  }
};

export const postTime = (time: Date) => {
  const hour = time.getHours();
  const minute = time.getMinutes();

  if (hour >= 12) {
    if (minute < 10) {
      return `${hour - 12}:0${minute} PM`;
    } else {
      return `${hour - 12}:${minute} PM`;
    }
  } else {
    if (minute < 10) {
      return `${hour}:0${minute} AM`;
    } else {
      return `${hour}:${minute} AM`;
    }
  }
};

export const userDate = (time: Date) => {
  const month = time.getMonth() + 1;
  const year = time.getFullYear();

  if (month === 1) {
    return "Jan " + year;
  } else if (month === 2) {
    return "Feb " + year;
  } else if (month === 3) {
    return "Mar " + year;
  } else if (month === 4) {
    return "Apr " + year;
  } else if (month === 5) {
    return "May " + year;
  } else if (month === 6) {
    return "Jun " + year;
  } else if (month === 7) {
    return "Jul " + year;
  } else if (month === 8) {
    return "Aug " + year;
  } else if (month === 9) {
    return "Sep " + year;
  } else if (month === 10) {
    return "Oct " + year;
  } else if (month === 11) {
    return "Nov " + year;
  } else if (month === 12) {
    return "Dec " + year;
  }
};
