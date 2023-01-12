
import EventRepository from "./repository";
import Event from "./models";

export default class EventService {

    /**
     * The event repository
     * @type {EventRepository}
     */
    _eventRepository;

    /**
     *
     * @param {EventRepository} eventRepository
     */
    constructor(eventRepository) {
        this._eventRepository = eventRepository;
    }

    /**
     * Return all events
     * @return {Event[]}
     */
    getEvents() {
        return this._eventRepository.getAll();
    }

    /**
     * Get the first upcomming event
     * @return {null | Event}
     */
    getFirstEvent() {
        let events = this.getEvents(),
            firstEvent = null;
        if (events.length > 0) {
            firstEvent = events[0];
        }
        events.forEach(event => {
            if (event.startTime < firstEvent.startTime) {
                firstEvent = event;
            }
        });
        return firstEvent; //TODO
    }

    /**
     * Get the last upcomming event
     * @return {null | Event}
     */
    getLastEvent() {
        let events = this.getEvents(),
            firstEvent = null;
        if (events.length > 0) {
            firstEvent = events[0];
        }
        events.forEach(event => {
            if (event.startTime > firstEvent.startTime) {
                firstEvent = event;
            }
        });

        return firstEvent;
    }

    /**
     * Get the longest event
     * @return {null | Event}
     */
    getLongestEvent() {
        let hummanDiff,
            events = this.getEvents(),
            firstEvent = null;
        if (events.length > 0) {
            firstEvent = events[0];
            hummanDiff = this.getDurration(firstEvent)
        }
        events.forEach(event => {
            if (this.getDurration(event) > hummanDiff) {
                firstEvent = event;
            }
        });
        return firstEvent;
    }

    /**
     * get the shortest event
     * @return {null | Event}
     */
    getShortestEvent() {
        let hummanDiff,
            events = this.getEvents(),
            firstEvent = null;
        if (events.length > 0) {
            firstEvent = events[0];
            hummanDiff = this.getDurration(firstEvent)
        }
        events.forEach(event => {
            if (this.getDurration(event) < hummanDiff) {
                firstEvent = event;
            }
        });
        return firstEvent;
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @return {Event[]}
     */
    hasEventOn(time) {
        let evts = this._eventRepository.getAll();
        return evts.filter(function (e) {
            return time >= e.getStartTime() && time <= e.getEndTime();
        });
    }

    // A implementer en TDD
    /**
     *
     * @param title
     * @return {null | Event}
     */
    getEventByTitle(title) {
        return null
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     */
    isLocationAvailable(time) {
    }

    /**
     * Get current events
     * @return {Event[]}
     */
    getCurrentEvents() {
        let now = Date.now();
        return this.hasEventOn(new Date(now));
    }
    /**
     * 
     * @param {Event} event 
     * @returns {int} 
     */
    getDurration(event) {
        let diff = event.getEndTime() - event.getStartTime();
        console.log(diff);
        return diff;
    }
}