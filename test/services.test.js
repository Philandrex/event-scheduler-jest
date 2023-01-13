import Event from "../src/models";
import EventRepository from "../src/repository";
import EventService from "../src/services";
jest.mock("../src/repository");



describe("Event Service", () => {

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        EventRepository.mockClear();
        EventRepository.mockImplementation(() => {
            return {
                getAll: () => fakeEvents.slice()
            }
        });
    });

    let fakeEvents = [
        new Event(new Date('2019-12-17T03:24:00'), new Date('2019-12-17T13:24:00'), "Hello World", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2018-12-17T03:24:00'), new Date('1995-12-17T03:24:00'), "First event", "Campus Numerique", "This is an hello world.."),
        new Event(new Date('2020-04-01T09:00:00'), new Date('2020-04-01T17:00:00'), "Unit test againt", "Campus Numerique", "This is an hello world..")
    ];

    test('getEvents shall call repository', async () => {
        let eventService = new EventService(new EventRepository());
        eventService.getEvents();
        expect(EventRepository).toHaveBeenCalledTimes(1);
    })

    test('getEvents shall return 4 result', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEvents().length).toBe(3);
    })

    test('getFirstEvent shall return event with title First event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getFirstEvent()).toBe(fakeEvents[1]);
    })

    test('getLastEvent shall return event with title Unit test againt', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLastEvent()).toBe(fakeEvents[2]);
    })

    test('getLongestEvent shall return event with title First event', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getLongestEvent()).toBe(fakeEvents[0]);
    })

    test('getShortestEvent shall return event with title Unit test againt', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getShortestEvent()).toBe(fakeEvents[2]);
    })

    test('getEventByTitle shall return event with title Unit test againt', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getEventByTitle("Unit test againt")).toBe(fakeEvents[2]);
    })

    test('hasEventOn shall return an array with one event with title Hello World', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.hasEventOn(new Date('2019-12-17T03:24:00')).length).toBe(1);
        expect(eventService.hasEventOn(new Date('2019-12-17T03:24:00'))[0]).toBe(fakeEvents[0]);
    })

    test('isLocationAvailable shall return boolean', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.isLocationAvailable(new Date('2019-12-17T03:24:00'))).toBe(false);
        expect(eventService.isLocationAvailable(Date.now())).toBe(true);

    })

    test('getCurrentEvents shall return 0', async () => {
        let eventService = new EventService(new EventRepository());
        expect(eventService.getCurrentEvents().length).toBe(0);
    })
});