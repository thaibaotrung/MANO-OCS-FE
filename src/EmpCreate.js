import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmpCreate = () => {
  const [id, idchange] = useState('');
  const [name, namechange] = useState('');
  const [description, descriptionchange] = useState('');
  const [vnfdId, vnfdIdchange] = useState('');
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { name, description, vnfdId, active };

    fetch('http://localhost:8080/vnflcm/v1/vnf_instances', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert('Saved successfully.');
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
          <form className='container' onSubmit={handlesubmit}>
            <div className='card' style={{ textAlign: 'left' }}>
              <div className='card-title'>
                <h2>VNF Instance Create</h2>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>ID</label>
                      <input value={id} disabled='disabled' className='form-control'></input>
                    </div>
                  </div>

                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className='form-control'
                      ></input>
                      {name.length == 0 && validation && <span className='text-danger'>Enter the name</span>}
                    </div>
                  </div>

                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Description</label>
                      <input
                        required
                        value={description}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => descriptionchange(e.target.value)}
                        className='form-control'
                      ></input>
                      {description.length == 0 && validation && (
                        <span className='text-danger'>Enter the description</span>
                      )}
                    </div>
                  </div>
                  {/* <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className='form-control'
                      ></input>
                    </div>
                  </div> */}

                  {/* <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => phonechange(e.target.value)}
                        className='form-control'
                      ></input>
                    </div>
                  </div> */}
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>vnfdId</label>
                      <input
                        required
                        value={vnfdId}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => vnfdIdchange(e.target.value)}
                        className='form-control'
                      ></input>
                      {vnfdId.length == 0 && validation && <span className='text-danger'>Enter the vnfdId</span>}
                    </div>
                  </div>

                  <div className='col-lg-12'>
                    <div className='form-check'>
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type='checkbox'
                        className='form-check-input'
                      ></input>
                      <label className='form-check-label'>Is Active</label>
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <button className='btn btn-success' type='submit'>
                        Save
                      </button>
                      <Link to='/' className='btn btn-danger'>
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;
