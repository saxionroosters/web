export default class ScheduleIdentity {

    constructor(groupId, teacherId, nickname) {
        this.groupId = groupId
        this.teacherId = teacherId
        this.nickname = nickname
    }

    static fromJSON(json) {
        return new ScheduleIdentity(json.groupId, json.teacherId, json.nickname)
    }

    isGroup() {
        return this.groupId !== null && this.groupId !== undefined
    }

    isTeacher() {
        return this.teacherId !== null && this.teacherId !== undefined
    }


    /**
     * Get the name of this identity
     * @returns string
     */
    getName(){
        if (this.nickname !== null && this.nickname !== undefined){
            return this.nickname
        }
        else if (this.isTeacher()){
            return this.teacherId
        }
        else{
            return this.groupId
        }
    }


}