const database = require('./database-connection')

module.exports = {
   listAll(){
      return database('students')
   },
   getById(id){
      return database('students').where({id: id}).first()
   },
   createStudent(studentInfo){
      return database('students').insert(studentInfo).returning('*')
   }
 }