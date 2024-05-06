import { EVENT_TYPE_ITEM } from '../constants';
import { getRandomArrayElement, getRandomInteger, getRandomDate } from '../utils';
import { getDestinations } from './destinations';
import { getOffers } from './offers';

const startDateFrom = new Date(2024, 1, 1);
const endDateFrom = new Date(2024, 6, 30);
const startDateTo = new Date(2024, 7, 1);
const endDateTo = new Date(2024, 12, 31);
class Event {
  constructor (){
    this.id = `36a94e3e-91f1-4760-bc3c-8033642f75${getRandomInteger(10,99)}`;
    this.basePrice = getRandomInteger(1000, 5000);
    this.dateFrom = getRandomDate(startDateFrom, endDateFrom);
    this.dateTo = getRandomDate(startDateTo, endDateTo);
    this.destination = getRandomArrayElement(getDestinations()).id;
    this.isFavorite = !!getRandomInteger(0, 1);
    this.type = getRandomArrayElement(EVENT_TYPE_ITEM);
    this.offers = this.getRandomOffers() || [''];
    // [
    //   '2660e1b7-037f-4c8f-acbe-1026f4d48e9d',
    //   '51734d83-edf3-44b4-86ef-16a0fb7a425f'
    // ];
  }

  getRandomOffers(){
    const index = getOffers().findIndex((offer) => offer.type === this.type);
    const randomArray = getRandomInteger(0, getOffers()[getOffers().findIndex((offer) => offer.type === this.type)].offers.length - 1);
    const offersArray = () => getOffers()[index].offers[getRandomInteger(0, getOffers()[index].offers.length) - 1]?.id;
    let arrayRandom = Array.from({length: randomArray}, offersArray);
    arrayRandom = arrayRandom.filter((element) => element !== undefined);
    const uniqueOffersArray = new Set(arrayRandom);
    return [...uniqueOffersArray];
  }
}

const getEvents = () => new Event;


export {getEvents};
