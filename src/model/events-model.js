import { getRandomEvent } from '../mock/events';
import { getDestinations } from '../mock/destinations';
import { getOffers } from '../mock/offers';
import { sortEvents } from '../utils/sort-events';

const EVENTS_NUMBER = 10;

export default class EventsModel{
  #eventsModel = Array.from({length: EVENTS_NUMBER}, getRandomEvent);
  #destinations = getDestinations();
  #offers = getOffers();


  get events(){
    return this.#eventsModel;
  }

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }

  getOffersByType(type){
    const offers = this.offers;
    return offers.find((offer) => offer.type === type);
  }

  getArrayOffersById(type, idOffersItem){
    const offersType = this.getOffersByType(type);
    return offersType.offers.find((offer) => offer.id === idOffersItem);
  }

  getDestinationById(id){
    const destinations = this.destinations;
    return destinations.find((destination) => destination.id === id);
  }

  getTotalCostTrip(){
    const costTripWithoutOffers = this.#eventsModel.reduce((total, eventTrip) => total + eventTrip.basePrice , 0);
    let costOffersAllEvents = 0;
    this.#eventsModel.forEach((eventTrip) => {
      if(eventTrip.offers.length !== 0){
        const offersTrip = this.getOffersByType(eventTrip.type);
        offersTrip.offers.forEach((offerTrip) => {
          if(offerTrip.length !== 0 && eventTrip.offers.includes(offerTrip.id)){
            costOffersAllEvents += offerTrip.price;
          }
        });
      }
    });
    return costTripWithoutOffers + costOffersAllEvents;
  }

  getTripInfo(){
    const sortDestinationsEvents = [...sortEvents['day'](this.#eventsModel)];
    const uniqueIdDestinations = [... new Set(sortDestinationsEvents.map((item) =>item.destination))];
    const destinations = getDestinations();
    let uniqueDestinationNames = [];
    const nameTripCity = () => uniqueIdDestinations.forEach((uniqueIdDestination) =>{
      destinations.forEach((destination) =>{
        if(destination.id === uniqueIdDestination){
          uniqueDestinationNames.push(destination);
        }
      });
    });
    nameTripCity();
    uniqueDestinationNames = uniqueDestinationNames.map((item) => item.name);
return uniqueDestinationNames || '';
  }
}
