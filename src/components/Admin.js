import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

function Admin() {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const auth = useContext(AuthContext);
  const url = process.env.REACT_APP_API_SERVER_URL + "application/";

  useEffect(() => {
    fetch(url )
      .then((res) => res.json())
      .then(
        (res) => {
          // console.log(res)
          setItems(res);
          setIsLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
        }
      );
  }, [url]);
  
  const confirm = () => {
    
  }

  const deleteitem = (id) => {
    fetch(url + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          setStatus({ message: "Your apllication deleted" });
          const remaining = items.filter((p) => id !== p.id);
          setItems(remaining);
        } else if (res.status === 401) {
          setError({ message: res.statusText });
        }
      },
      (err) => {
        console.log(err);
        setError(err);
        setIsLoaded(true);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <h1>Your Requests</h1>
        {status === null ? (
          ""
        ) : (
          <p className=" col-4 bg-success text-white p-2 text-center mx-auto">
            {status.message}
          </p>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Request number</th>
              <th>Parents name</th>
              <th>Childs name</th>
              <th>School</th>
              <th>Confirmation</th>
              <th>
                <span className="mx-1 float-end">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user.name}</td>
                <td>{item.full_name}</td>
                <td>{item.school.name}</td>
                <td>{item.confirmation ? " Confirmed" : "Not confirmed"}</td>
                <td>
                  <button
                    className="btn btn-danger mx-1 float-end"
                    onClick={() => deleteitem(item.id)}
                  >
                    Delete apllication
                  </button>
                  <button
                    className="btn btn-success mx-1 float-end"
                    onClick={() => confirm(item.id)}
                  >
                    Confirmation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Admin;
