import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './components/SidebarData';
import './components/Navbar.css';
import { IconContext } from 'react-icons';
const EmpListing = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (name) => {
    console.log(name);
    navigate(`/vnfc/${name}`);
  };

  const LoadScale = (name) => {
    console.log(name);
    navigate(`/scale/${name}`);
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
        method: 'DELETE',
      })
        .then((res) => {
          alert('Delete successfully.');
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
    <>
      {/* <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider> */}
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
                            LoadScale(item.name);
                          }}
                          className='btn btn-primary'
                        >
                          Scale
                        </a>
                        <a
                          onClick={() => {
                            Deletefunction(item.name);
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
            <div className='form-group'>
              {/* <a
              onClick={() => {
                Scale(name);
              }}
              className='btn btn-primary'
            >
              Scale
            </a> */}
              <Link to='/' className='btn btn-danger'>
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpListing;
