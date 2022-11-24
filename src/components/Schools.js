import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Schools() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const auth = useContext(AuthContext);
  const url = process.env.REACT_APP_API_SERVER_URL + "school";
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Bearer ${auth.getToken()}`,
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (res) => {
          setItems(res);
          setIsLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
        }
      );
  }, [url]);

  const deleteitem = (id, e) => {
    fetch(url + "/" + id, {
      method: "DELETE",
      headers: hs,
    }).then(
      (res) => {
        if (res.status === 200) {
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
    const searchSchool = (event) => {
      event.preventDefault();
      let item = event.target.name.value;
      let searchUrl =
        item.length === 0 ? url  : url + "?search=" + item;
      fetch(searchUrl)
        .then((res) => res.json())
        .then(
          (res) => {
            setItems(res);
            setIsLoaded(true);
          },
          (err) => {
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
        <h1>Available Schools</h1>
        <div className="float-end">
          <form className="float-end" onSubmit={(e) => searchSchool(e)}>
            <label>Search hotel:</label>
            <div className="d-flex">
              <input className="form-control" name="name"></input>
              <button className="btn border">Search</button>
            </div>
          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>School Name</th>
              <th>Address</th>
              <th>Code</th>
              {auth.getRole() === 2 ? (
                <th>
                  <span className="mx-1 float-end">Actions</span>
                </th>
              ) : (
                <></>
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.code}</td>
                {auth.getRole() === 2 ? (
                  <>
                    <td>
                      <button
                        className="btn btn-danger  float-end"
                        onClick={() => deleteitem(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-warning mx-1 float-end"
                        onClick={() => navigate(`/schools/${item.id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-primary float-end"
                        onClick={() => navigate(`/application/${item.id}`)}
                      >
                        Select
                      </button>
                    </td>
                  </>
                ) : (
                  <button
                    className="btn btn-primary float-end"
                    onClick={() => navigate(`/schools/${item.id}`)}
                  >
                    Select
                  </button>
                )}
              </tr>
            ))}
            <tr>
              <td
                colSpan="4"
                className="border border-3 border-start-0 border-bottom-0 border-end-0"
              >
                {auth.getRole() === 2 ? (
                  <div className="mb-5">
                    <button
                      onClick={(e) => navigate(`/schools/create`)}
                      className="btn btn btn-success float-end mx-1"
                    >
                      Add new School
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Schools;
