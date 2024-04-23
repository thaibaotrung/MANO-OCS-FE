import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmpListing = () => {
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (name) => {
    console.log(name);
    navigate(`/vnfc/${name}`);
  };
  const LoadInstantiate = (name) => {
    // navigate('/employee/edit/' + id);
    fetch(`http://localhost:8080/vnflcm/v1/vnf_instances/instantiate/${name}`, {
      method: 'POST',
    })
      .then((res) => {
        alert('Instantiated successfully.');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const Terminatefunction = (name) => {
    if (window.confirm('Do you want to terminate?')) {
      fetch(`http://localhost:8080/vnflcm/v1/vnf_instances/terminate/${name}`, {
        method: 'POST',
      })
        .then((res) => {
          alert('Terminate successfully.');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const Deletefunction = (name) => {
    if (window.confirm('Do you want to delete?')) {
      fetch(`http://localhost:8080/vnflcm/v1/vnf_instances/delete/${name}`, {
        method: 'POST',
      })
        .then((res) => {
          alert('Terminate successfully.');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const LoadHealing = (name) => {
    // navigate('/employee/edit/' + id);
    fetch(`http://localhost:8080/vnflcm/v1/vnf_instances/healing/${name}`, {
      method: 'POST',
    })
      .then((res) => {
        alert('Healing successfully.');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch('http://localhost:8080/vnflcm/v1/vnf_instances/list')
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-title'>
          <h2>VNF Instance List</h2>
        </div>
        <div className='card-body'>
          <div className='divbtn'>
            <Link to='employee/create' className='btn btn-success'>
              Add New (+)
            </Link>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>VNFDID</td>
                <td>STATE</td>
                <td>DESCRIPTION</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.vnfdId}</td>
                    <td>{item.state}</td>
                    <td>{item.description}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadInstantiate(item.name);
                        }}
                        className='btn btn-success'
                      >
                        Instantiate
                      </a>
                      <a
                        onClick={() => {
                          Terminatefunction(item.name);
                        }}
                        className='btn btn-danger'
                      >
                        Terminate
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.name);
                        }}
                        className='btn btn-primary'
                      >
                        Details
                      </a>
                      <a
                        onClick={() => {
                          LoadHealing(item.name);
                        }}
                        className='btn btn-primary'
                      >
                        Healing
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.id);
                        }}
                        className='btn btn-primary'
                      >
                        Scale
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.id);
                        }}
                        className='btn btn-primary'
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
