import { useState, useEffect } from 'react';
import AddNew from "./components/add";
import TBook from "./components/tbook";
import phoneServ from "./services/phoneserv";


const ErrorMessage = ({content}) => content === null ? null : <div style={{color: "red", background: "lightgrey", fontSize: 20, borderStyle: "solid", borderRadius: 5, padding: 10, marginBottom: 10}}>{content}</div>; 


const App = () => {
    const [data, setData] = useState([]);
 
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
const [newContact, setNewContact] = useState({});
const [search, setSearch] = useState("");
const [error, setError] = useState("An error occurred");

useEffect(() => {
    phoneServ.getAll().then((saved) => {
        setData(saved);
    });
}, []);

// the data shown in the <table> element, it's filtered with the search field so that if the search field is empty,  the whole data is shown, otherwise only contacts  with names that match the search
// the search is case insensitive
// also whitespaces are omitted
const content  = search.replace(/\s/g, "").length > 0
  ? data.filter(d =>
      d.name.replace(/\s/g, "").toLowerCase()
        .includes(search.replace(/\s/g, "").toLowerCase())
    )
  : data;
    
  
  const handleNameChange = (e) =>  {
setName(e.target.value);
    }

    const handlePhoneChange = (e) =>  {
        setPhone(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }
/**
 *  compares two strings case insensitively omitting whitespaces 
 * @param {string} a first string 
 * @param {string} b second string 
 * @returns true if they are identical, false otherwise
 */
    const strCmp = (a, b) => a.toLowerCase().replace(/\s/g, "") === b.toLowerCase().replace(/\s/g, "");


    // adds a new contact
    // the name of the contact must  be unique 
    const addNew =  (e) => {
        e.preventDefault();
        if (data.some((e) => strCmp(e.name, name) && strCmp(e.phone, phone))) {
            alert(`${name} already exists`);
            setName("");
            setPhone("");
        return;    
          }

          else if (data.some((e) => strCmp(e.name, name))) {
            if (confirm(`You are about to update the phone number for ${name}. Do you want to continue?`)) {
                const old = data.find((e) => strCmp(e.name, name));
                updatePhone(old.id);  
                setName("");
                setPhone("");
            }
          } 

          else {

            const newId = data.length > 0 ?  Math.max(...data.map((e) => Number(e.id)))+1 : 0;

            const c = {"id": `${newId}`, "name": name, "phone": phone};
            phoneServ.create(c).then((added) => { 
                setData(data.concat(added));
                setName("");
                setPhone("");
            }
            );
            
            
          }

        
    }
/**
 *  deletes a contact
 * @param {number} id id of the deleted contact
 */
const deleteContact = (id) => {  
    const d = data.find(a => a.id === id);
    if (confirm(`Are you sure you want to delete ${d.name} from the phone book?`)) {
        phoneServ.drop(id).then(() => { 
            setData(data.filter(item => item.id !== id));
        }
        
        );
        

    }



}    
    /**
     *  updates the phone for a contact
     * @param {number} id the id of the updated contact  
     */
    const updatePhone = (id) => {
        const  url = `http://localhost:3001/${id}`;
        const c = data.find(e => e.id === id);
const edited = {...c, "phone": phone};
phoneServ.update(id, edited).then((uc) => {
    setData(data.map(e => e.id !== id ? e : uc));
}

).catch((err) => {
    setError("Contact has been already removed");
    setTimeout(() => {
        setError(null);
    },5000);
    setData(data.filter(e => e.id !== id));
}
);
    }


    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className='container'>
            <h2 className='text-primary'>Add a phone</h2>
            <ErrorMessage content={error}/>
            <AddNew  name={name} phone={phone} onNameChange={handleNameChange} onPhoneChange={handlePhoneChange} onSubmit={addNew}/>
<h2 className='text-primary'>Contacts</h2>
        <TBook data={content} onChange={handleSearchChange} onDelete={deleteContact}/>
    
        </div>
        
        );
}

export default App
