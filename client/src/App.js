import React, { useState, useRef, useEffect } from 'react';

function App() {

  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [listUpdated, setListUpdated] = useState(false);

  const fileInput = useRef(null);

  useEffect(() => {
    fetch('http://localhost:9000/images/get')
      .then(res => res.json())
      .then(res => setImageList(res))
      .catch(err => console.error(err));
    
    setListUpdated(false);
  }, [listUpdated])

  const selectedHandler = e => {
    setFile(e.target.files[0]);
  }

  const sendHandler = () => {
    if (!file) {
      alert('you must upload file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:9000/images/post', {
      method: 'POST',
      body: formData
    }).then(res => res.text())
      .then(res => {
        console.log(res);
        setListUpdated(true);
      })
      .catch(err => console.error(err));

    fileInput.current.value = null;
    setFile(null);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">Image App</a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input ref={fileInput} onChange={selectedHandler} type="file" name="" className="form-control" />
            </div>
            <div className="col-2">
              <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Upload</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'}}>
        {
          imageList.map(image => {
            return <div key={image} className="card">
              <img src={"http://localhost:9000/" + image} alt="..." className="card-img-top" height={300} style={{objectFit: 'cover'}} />
            </div>
          })
        }
      </div>
    </>
  );
}

export default App;
