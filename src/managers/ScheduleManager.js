import Axios from 'axios'
import ScheduleIdentity from '../models/ScheduleIdentity'
import AuthManager from './AuthManager'

export default class ScheduleManager {


    constructor() {
        this.baseUrl = 'https://roosters.rest.saxion.nl/api'
    }


    getGroups() {
        let url = this._buildUrl('/groups')
        Axios.get(url)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                this._handleGenericError(error)
            })

    }

    /**
     *
     * @param scheduleIdentity
     * @param weekOffset Offset of the week, 0 is relative
     * @param callback(response)
     */
    getScheduleWeek(scheduleIdentity, weekOffset = 0, callback) {

        let url
        if (scheduleIdentity.isGroup()) {
            // Load group
            url = this._buildUrl('/groups/schedule', {group: scheduleIdentity.groupId, week: weekOffset})
        } else {
            // Load teacher
            url = this._buildUrl('/teachers/schedule', {teacher: scheduleIdentity.teacherId, week: weekOffset})
        }

        Axios.get(url)
            .then((response) => {
                console.log(response)
                callback(response.data)
            })
            .catch((error) => {
                this._handleGenericError(error)
            })
    }

    getTimeTables() {
        Axios.get(this._buildUrl('/timetables'))
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                this._handleGenericError(error)
            })
    }

    search(query, callback) {
        Axios.get(this._buildUrl('/search', {q: query}))
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                this._handleGenericError(error)
            })
    }

    /**
     * Handle generic API errors
     * @param error the error from Axios
     * @private
     */
    _handleGenericError(error) {
        if (error.response.status === 401) {
            AuthManager.logout()
        }
    }

    /**
     * Create a URL
     * @param route the url route
     * @param params the additional params
     * @returns {string}
     * @private
     */
    _buildUrl(route, params) {
        let url = this.baseUrl + route + `?access_token=${AuthManager.getAccessToken()}`

        if (params !== undefined) {
            for (let key in params) {
                url += `&${key}=${params[key]}`
            }
        }
        return url
    }


}