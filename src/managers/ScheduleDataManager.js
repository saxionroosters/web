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

        // Check if this schedule was not already saved before
        let foundMatch = this._findIdentity(scheduleIdentity, schedules)

        if (foundMatch === null) {
            schedules.push(scheduleIdentity)
        } else {
            schedules[schedules.indexOf(foundMatch)] = scheduleIdentity
        }

        localStorage.setItem(savedSchedulesKey, JSON.stringify(schedules))
    }

    static removeScheduleIdentity(scheduleIdentity) {
        let schedules = ScheduleDataManager.getSavedScheduleIdentities()
        let foundMatch = this._findIdentity(scheduleIdentity, schedules)
        if (foundMatch !== null) {
            schedules.splice(schedules.indexOf(foundMatch), 1)
            localStorage.setItem(savedSchedulesKey, JSON.stringify(schedules))
        }
    }


    /**
     * Search for a specific schedule identity in given array
     * @param scheduleIdentity The identity to search for
     * @param array The array to search in
     * @returns ScheduleIdentity | null
     * @private
     */
    static _findIdentity(scheduleIdentity, array) {
        let foundMatch = null
        if (scheduleIdentity.isGroup()) {
            array.forEach((obj) => {
                if (obj.isGroup() && obj.groupId === scheduleIdentity.groupId) {
                    // Match
                    foundMatch = obj
                }
            })
        } else {
            array.forEach((obj) => {
                if (obj.isTeacher() && obj.teacherId === scheduleIdentity.teacherId) {
                    // Match
                    foundMatch = obj
                }
            })
        }
        return foundMatch
    }
}
