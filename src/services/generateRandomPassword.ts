import bcrypt from 'bcrypt'

const generateRandomPassword = (teacherName: string) =>{
   const randomNumber = Math.floor(1000 + Math.random() * 90000)
   const passwordData = {
    hashedVersion : bcrypt.hashSync(`${randomNumber}_${teacherName}`, 10), //for storing in table
    plainVersion : `${randomNumber}_${teacherName}` //to send password to teacher to login
   }
    return passwordData
}
export default generateRandomPassword