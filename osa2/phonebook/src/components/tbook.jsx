
const TBook = ({data, onChange, onDelete}) =>  {
  const searchField = (
    <div className="mb-3">
      <label htmlFor="s" className="form-label">Search</label>
      <input
        id="s"
        onChange={onChange}
        type="text"
        className="form-control"
      />
    </div>
  );

    const noResults = <p className="text-muted">No results</p>;
    
    if (data.length === 0) {
        return <>{searchField} {noResults}</>;
    }
    const o = Object.keys(data[0]).filter((k) => k !== "id");
    const headers = o.map((e) =>  <th key={e}>{e}</th>);
    headers.push(<th key="ac">Actions</th>);

    const content = data.map((e) => (
        <tr key={e.id}>
{o.map((k) => <td key={`${k}${e.id}`}>{e[k]}</td>)}
<td key={`${e.id}action`}>
  <button  className="btn btn-block text-danger" onClick={() => onDelete(e.id)}>Delete</button>
</td>
        </tr>
    ));

const r = (
    
    <table className="table table-bordered table-hover">
        <thead className="table-light">
<tr>{headers}
</tr>
            
        </thead>
        <tbody>
            {content}
        </tbody>
    </table>
    
);
return <>{searchField} {r}</>; 
 

}

export default TBook;