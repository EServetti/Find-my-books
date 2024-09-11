import userDTO from "../DAO/DTO/users.dto.js"

class CustomService {
  constructor(manager) {
    this.manager = manager;
  }
  
   readService = async (filter) => {
    try {
      const all = await this.manager.read(filter)
      return all
    } catch (error) {
      throw error
    }
  }

   readOneService = async (id) => {
    try {
      const one = await this.manager.readOne(id) 
      return one
    } catch (error) {
      throw error
    }
  }
  readByEmailService = async (email) => {
    try {
      const one = await this.manager.readByEmail(email) 
      return one
    } catch (error) {
      throw error
    }
  }
  readFriendsService = async (user) => {
    try {
      const arrayOfFriends = await this.manager.readFriends(user)
      return arrayOfFriends
    } catch (error) {
      throw error
    }
  }

  createService = async (data) => {
    try {
      if(data.email) {
        data = new userDTO(data)
      }
      const one = await this.manager.create(data)
      return one
    } catch (error) {
      throw error
    }
  }

  updateService = async (id, data) => {
    try {
      const one = await this.manager.update(id, data)
      return one
    } catch (error) {
      throw error
    }
  }

  destroyService = async (id) => {
    try {
      const one = await this.manager.destroy(id)
      return one
    } catch (error) {
      throw error
    }
  }
}

export default CustomService