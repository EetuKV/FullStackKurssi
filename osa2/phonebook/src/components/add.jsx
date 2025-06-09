const AddNew = ({name, phone, onNameChange, onPhoneChange, onSubmit}) => (
  <form onSubmit={onSubmit} className="mb-4 p-3 border rounded bg-light">
    <div className="mb-3">
      <label htmlFor="n" className="form-label">Name</label>
      <input
        id="n"
        type="text"
        value={name}
        onChange={onNameChange}
        required
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="p" className="form-label">Phone</label>
      <input
        id="p"
        type="tel"
        value={phone}
        onChange={onPhoneChange}
        required
        className="form-control"
      />
    </div>

    <button type="submit" className="btn btn-primary">Add</button>
  </form>
);

export default AddNew;