const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const EVENT_TYPES_TRIP = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const FiltresTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
const DateFormat = {
  DATE_FORMATE: 'MMM DD',
  TIME_FORMAT: 'HH:mm',
  DATE_FORMATE_FORM: 'DD/MM/YY',
};
const DATE_NOW = new Date().toISOString();

export {FILTER_TYPES, FiltresTypes, SORT_TYPES, EVENT_TYPES_TRIP, DateFormat, DATE_NOW};
