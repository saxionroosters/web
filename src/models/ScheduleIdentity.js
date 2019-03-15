export default class ScheduleIdentity {

    constructor(groupId, teacherId, nickname) {
        this.groupId = groupId
        this.teacherId = teacherId
        this.nicname = nickname
    }

    isGroup(){
        return this.groupId !== undefined
    }

    isTeacher(){
        return this.teacherId !== undefined
    }


}