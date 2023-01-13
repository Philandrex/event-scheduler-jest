
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
     * @return {[] | Event}
     */
    getFirstEvent() {
        const events = this._eventRepository.getAll();
        events.sort((event1, event2) => {
            return event1.getStartTime() - event2.getStartTime();
        });
        return events[0] ?? [];
    }

    /**
     * Get the last upcomming event
     * @return {[] | Event}
     */
    getLastEvent() {
        let events = this.getEvents(),
            e = [];
        if (events.length > 0) {
            e = events[0];
        }
        events.forEach(event => {
            if (event.startTime > e.startTime) {
                e = event;
            }
        });

        return e;
    }

    /**
     * Get the longest event
     * @return {[] | Event}
     */
    getLongestEvent() {
        let duration,
            events = this.getEvents(),
            e = [];
        if (events.length > 0) {
            e = events[0];
            duration = this.getDuration(e)
        }
        events.forEach(event => {
            if (this.getDuration(event) > duration) {
                e = event;
            }
        });
        return e;
    }

    /**
     * get the shortest event
     * @return {[] | Event}
     */
    getShortestEvent() {
        let duration,
            events = this.getEvents(),
            e = [];
        if (events.length > 0) {
            e = events[0];
            duration = this.getDuration(e)
        }
        events.forEach(event => {
            if (this.getDuration(event) < duration) {
                e = event;
            }
        });
        return e;
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
     * @return {[] | Event}
     */
    getEventByTitle(title) {
        let events = this.getEvents(),
            e = [];
        events.forEach(event => {
            if (event.getTitle() === title) {
                e = event;
            }
        });
        return e;
    }

    // A implementer en TDD
    /**
     *
     * @param {Date} time
     * @returns {Boolean}
     */
    isLocationAvailable(time) {
        return !this.hasEventOn(time).length > 0
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
    getDuration(event) {
        let diff = event.getEndTime() - event.getStartTime();
        return diff;
    }
}