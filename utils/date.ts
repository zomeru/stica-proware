export const dateFormatter = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const dayOfWeek = days[date.getDay()];

  // example format: Dec. 31, 2020 - Fri 12:00 PM (24-hour format)
  return `${months[month - 1]}. ${day}, ${year} - ${dayOfWeek} ${
    hour > 12 ? hour - 12 : hour
  }:${minute < 10 ? '0' + minute : minute} ${hour < 12 ? 'AM' : 'PM'}`;
};
