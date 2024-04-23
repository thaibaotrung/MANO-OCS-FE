import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const EmpDetail = () => {
  const { name } = useParams();

  const [empdata, empdatachange] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/vnflcm/v1/vnf_instances/listVnfc/${name}`)
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
                <td>STATE</td>
                <td>NODENAME</td>
                <td>IP</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.vnfcList.map((vnfc, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{vnfc.name}</td>
                        <td>{vnfc.state}</td>
                        <td>{vnfc.nodeName}</td>
                        <td>{vnfc.ip ? vnfc.ip : '-'}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpDetail;
