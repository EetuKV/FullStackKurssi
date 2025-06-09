import axios from "axios";

const baseUrl = "http://localhost:3001/phonebook";
/**
 *  gets the  entire data from the server
 * @returns the data from the server response 
 */
const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}


/**
 *  posts the added/created contact 
 * @param {object} created   contact
 * @returns the server response, that is the added  contact
 */
const  create = async (created) => {
    const response = await axios.post(baseUrl, created);
    return response.data;
}

/**
 *  updates a contact
 * @param id id of the contact that must be updated  
 * @param {object} updated the updated version of the contact 
 * @returns the server response, that is the updated  contact
 */
const update = async (id, updated) =>  {
   const response = await axios.put(`${baseUrl}/${id}`, updated);
   return response.data;

}


 /**
  *  deletes a contact
  *  @param id id of the deleted contact
   */
 
const drop = async (id) =>  {
await axios.delete(`${baseUrl}/${id}`);


} 

export default {getAll, create, update, drop}