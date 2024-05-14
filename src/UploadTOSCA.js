// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { type } from '@testing-library/user-event/dist/type';
// import { Link, useParams } from 'react-router-dom';
// function UploadTOSCA() {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState({ started: false, pc: 0 });
//   const [msg, setMsg] = useState(null);

//   const [empdata, empdatachange] = useState([]);

//   function handleUpload() {
//     if (!file) {
//       console.log('No file selected');
//       return;
//     }

//     const fd = new FormData();
//     fd.append('file', file);

//     setMsg('Uploading...');
//     setProgress((prevState) => {
//       return {
//         ...prevState,
//         started: true,
//       };
//     });
//     axios
//       .post('http://httpbin.org/post', fd, {
//         onUploadProgress: (ProgressEvent) => {
//           setProgress((prevState) => {
//             return { ...prevState, pc: ProgressEvent.progress * 100 };
//           });
//         },
//         headers: {
//           'Custom-Header': 'value',
//         },
//       })
//       .then((res) => {
//         setMsg('Upload successful');
//         console.log(res.data);
//       })
//       .catch((err) => {
//         setMsg('Upload failed');
//         console.error(err);
//       });
//   }
//   return (
//     <div className='App'>
//       <h1>Uploading TOSCA files</h1>
//       <input
//         onChange={(e) => {
//           setFile(e.target.files[0]);
//         }}
//         type='file'
//       />
//       <button onClick={handleUpload}>Upload</button>
//       {progress.started && <process max='100' value={progress.pc}></process>}
//       {msg && <process max='100' value={progress.pc}></process>}
//     </div>
//   );

//   useEffect(() => {
//     fetch('http://localhost:8080/vnflcm/v1/vnf_instances/listVnfd')
//       .then((res) => {
//         console.log(res);
//         return res.json();
//       })
//       .then((resp) => {
//         empdatachange(resp);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   return (
//     <div className='container'>
//       <div className='card'>
//         <div className='card-title'>
//           <h2>VNFD List</h2>
//         </div>
//         <div className='card-body'>
//           <table className='table table-bordered'>
//             <thead className='bg-dark text-white'>
//               <tr>
//                 <td>ID</td>
//                 <td>Name</td>
//                 <td>STATE</td>
//                 <td>NODENAME</td>
//                 <td>IP</td>
//               </tr>
//             </thead>
//             <tbody>
//               {empdata &&
//                 empdata.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.name}</td>
//                     <td>{item.version}</td>
//                     <td>{item.createdBy}</td>
//                     <td>{item.provider}</td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//           <div className='form-group'>
//             {/* <a
//               onClick={() => {
//                 Scale(name);
//               }}
//               className='btn btn-primary'
//             >
//               Scale
//             </a> */}
//             <Link to='/' className='btn btn-danger'>
//               Back
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadTOSCA;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function UploadTOSCA() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const [empdata, setEmpData] = useState([]);

  function handleUpload() {
    if (!file) {
      console.log('No file selected');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);

    setMsg('Uploading...');
    setProgress((prevState) => {
      return {
        ...prevState,
        started: true,
      };
    });
    axios
      .post('http://httpbin.org/post', fd, {
        onUploadProgress: (ProgressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: ProgressEvent.progress * 100 };
          });
        },
        headers: {
          'Custom-Header': 'value',
        },
      })
      .then((res) => {
        setMsg('Upload successful');
        console.log(res.data);
      })
      .catch((err) => {
        setMsg('Upload failed');
        console.error(err);
      });
  }

  useEffect(() => {
    fetch('http://localhost:8080/vnflcm/v1/vnf_instances/listVnfd')
      .then((res) => res.json())
      .then((resp) => {
        setEmpData(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <h1>Uploading TOSCA files</h1>
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        type='file'
      />
      <button onClick={handleUpload}>Upload</button>
      {progress.started && <progress max='100' value={progress.pc}></progress>}
      {msg && <p>{msg}</p>}

      <div className='container'>
        <div className='card'>
          <div className='card-title'>
            <h2>VNFD List</h2>
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
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.version}</td>
                      <td>{item.createdBy}</td>
                      <td>{item.provider}</td>
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
    </div>
  );
}

export default UploadTOSCA;
