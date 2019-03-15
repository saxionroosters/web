const savedSchedulesKey = 'saved_schedules'
const scheduleDataKey = 'schedules'

export default class ScheduleDataManager{


    constructor() {

    }

    static getSavedScheduleIdentities() {
        let items = localStorage.getItem(savedSchedulesKey)
        return items == null ? [] : items;
    }

    static saveScheduleIdentity(scheduleIdentity) {
        let schedules = this.getSavedSchedules()

    }

    static removeScheduleIdentity(){

    }
}
