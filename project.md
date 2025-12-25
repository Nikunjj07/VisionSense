This is a project for attendance montitoring for students.
This contains the business logic of the project.
This contains three folders client, common and server.
Client folder contains the client side code which is in react.
Common folder contains the common code which is a typescript file defining the schema of the data using zod.
Server folder contains the server side code which is in nodejs + express and typescript.

Following are the types used in the project:
1. SignupType
2. SigninType
3. InitializeSessionType
4. StudentData - id, spid, name, classId, faceEncoding
5. ClassData - id, name, students
6. AttendanceData - id, studentId, classId, date, isPresent

MongoDB is used as the database.
User Table{
    id,
    name,
    email,
    password
}

Class Table{
    id,
    name,
    students : array
}

Student Table{
    id,
    spid,
    name,
    classId,
    faceEncoding : string
}

Attendance Table{
    id,
    studentId,
    classId,
    date,
    isPresent : boolean
}

Attention Table{
    id,
    studentId,
    classId,
    date,
    time,
    focusPercent : number
}

Session Table{
    id,
    userId,
    startAt,
    endAt,
    duration,
    status
}