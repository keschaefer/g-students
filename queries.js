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
   },

   deleteStudent(id){
      return database('students').where({id: id}).delete()
   },
   
   updateStudent(id, student){
      return database('students').where({id: id}).update(student).returning('*')
   }
 }