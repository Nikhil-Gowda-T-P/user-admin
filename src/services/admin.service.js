const adminQuery=require("../queries/admin.query")

const getAllUsers= async() =>{
    try {
        const users= await adminQuery.getAllUsers();
        return users
    }
    catch(error){
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
      const user = await adminQuery.deleteUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  };
        

module.exports={
    getAllUsers,
    deleteUser
}