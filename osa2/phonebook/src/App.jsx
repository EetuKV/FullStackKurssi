import { useState } from 'react';
import AddNew from "./add";
import TBook from "./tbook";

const App = () => {
    const [data, setData] = useState([
        {id: 0, name: "Markku Mäkelä", phone: "045 203 3434"},
        {id: 1, name: "Heidi Putkonen", phone: "+347-9-3650344"}

    ]);
 
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
const [newContact, setNewContact] = useState({});

const [search, setSearch] = useState("");
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
    const addNew = (e) => {
        e.preventDefault();
        if (data.some((e) => strCmp(e.name, name))) {
            alert(`${name} already exists`);
            setName("");
            setPhone("");
        return;    
          }
        const c = {"id": data[data.length-1].id+1, "name": name, "phone": phone};
        setData(data.concat(c));
        setName("");
        setPhone("");
        
    }
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className='container'>
            <h2 className='text-primary'>Add a phone</h2>
            <AddNew  name={name} phone={phone} onNameChange={handleNameChange} onPhoneChange={handlePhoneChange} onSubmit={addNew}/>
<h2 className='text-primary'>Contacts</h2>
        <TBook data={content} onChange={handleSearchChange}/>
    
        </div>
        
        );
}

export default App
