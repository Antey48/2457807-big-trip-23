import dayjs from 'dayjs';
import { DateFormat } from '../constants';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const getRandomArrayElement = (items) =>items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);
// const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const formatDate = (dueDate) => dayjs(dueDate).format(DateFormat.DATE_FORMATE);
const formatTime = (dueDate) => dayjs(dueDate).format(DateFormat.TIME_FORMAT);
const formatDateForm = (dueDate) => dayjs(dueDate).format(DateFormat.DATE_FORMATE_FORM);
const formatDateTripInfo = (dueDate) => dayjs(dueDate).format(DateFormat.DATE_FORMATE_TRIP_INFO);

const getDuration = (dateFrom, dateTo) => {

  const start = dayjs(dateFrom).startOf('minute');
  const end = dayjs(dateTo).startOf('minute');
  const differenceInMilliseconds = end.diff(start);
  const eventDuration = dayjs.duration(differenceInMilliseconds);
  const days = Math.floor(eventDuration.asDays());
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes}M`;
  }
};
export {getRandomArrayElement, getRandomInteger, getRandomDate, formatDate, formatTime, formatDateForm, formatDateTripInfo, getDuration};

