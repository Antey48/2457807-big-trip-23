import dayjs from 'dayjs';
import { DateFormat } from './constants';
const getRandomArrayElement = (items) =>items[Math.floor(Math.random() * items.length)];


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const formatDate = (dueDate) =>dayjs(dueDate).format(DateFormat.DATE_FORMATE);
const formatTime = (dueDate) =>dayjs(dueDate).format(DateFormat.TIME_FORMAT);

export {getRandomArrayElement, getRandomInteger, getRandomDate, formatDate, formatTime};

