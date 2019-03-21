import ScheduleIdentity from "../models/ScheduleIdentity";

const savedSchedulesKey = 'saved_schedules'
const scheduleDataKey = 'schedules'

export default class ScheduleDataManager {

    /**
     * Get all the saved schedule identities
     * @returns {Array<ScheduleIdentity>}
     */
    static getSavedScheduleIdentities() {

        let json = localStorage.getItem(savedSchedulesKey)
        if (json != null) {
            let parsedItems = JSON.parse(json)
            let objectArray = []
            parsedItems.forEach((obj) => {
                objectArray.push(ScheduleIdentity.fromJSON(obj))
            })
            return objectArray
        }
        return []
    }

    /**
     * Save a new schedule identity
     * @param scheduleIdentity
     */
    static saveScheduleIdentity(scheduleIdentity) {
        let schedules = ScheduleDataManager.getSavedScheduleIdentities()
        console.log(schedules)
        schedules.push(scheduleIdentity)
        localStorage.setItem(savedSchedulesKey, JSON.stringify(schedules))
    }

    static removeScheduleIdentity() {
        // TODO: fix
    }
}
