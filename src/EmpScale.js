import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import TrungNguLol from './components/trung-ngu';

const EmpScale = () => {
  const { name } = useParams();

  const [empdata, empdatachange] = useState([]);

  const Scale = (name) => {
    // navigate('/employee/edit/' + id);
    fetch(`http://localhost:8080/vnflcm/v1/vnf_instances/scale/${name}`, {
      method: 'POST',
    })
      .then((res) => {
        alert('Scale successfully.');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/vnflcm/v1/vnf_instances/listDeployment/${name}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((resp) => {
        empdatachange(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-title'>
          <h2>VNFc List</h2>
        </div>
        <div className='card-body'>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Current Number Of Instance</td>
                <td>Number Scale</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {/* {empdata &&
                empdata.map((item, index) => {
                  console.log(index);
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>
                        <TrungNguLol key={item} />
                      </td>
                    </tr>
                  );
                })} */}
              {empdata &&
                empdata.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.vnfcList.map((vnfc, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{vnfc.name}</td>
                        <td>{vnfc.numberofinstance}</td>
                        <td>
                          <TrungNguLol key={item.vnfcList.name} />
                        </td>

                        <td>
                          <a
                            onClick={() => {
                              Scale(name);
                            }}
                            className='btn btn-primary'
                          >
                            Scale
                          </a>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
          <div className='form-group'>
            {/* <a
              onClick={() => {
                Scale(name);
              }}
              className='btn btn-primary'
            >
              Scale
            </a> */}
            <Link to='/vnf' className='btn btn-danger'>
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpScale;
