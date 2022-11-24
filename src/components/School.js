import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const School = () => {
  let { id } = useParams();
  const [status, setStatus] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({ name: undefined });
  const url = process.env.REACT_APP_API_SERVER_URL + "school";
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Bearer ${auth.getToken()}`,
  };

  useEffect(() => {
    if (id)
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then(
          (res) => {
            setItems(res);
            setIsLoaded(true);
          },
          (err) => {
            setInitialLoadError(err);
            setIsLoaded(true);
          }
        );
    else setIsLoaded(true);
  }, [id, url]);

  const createItem = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: hs,
      body: JSON.stringify(items),
    }).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          setStatus({ message: res.statusText });
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      },
      (err) => {
        setStatus(err);
      }
    );
  };

  const updateItem = (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: hs,
      body: JSON.stringify(items),
    }).then(
      (res) => {
        if (res.status === 200) {
          setStatus({ message: res.statusText });
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      },
      (err) => {
        setStatus(err);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (initialLoadError) {
    return <div>Error: {initialLoadError.message}</div>;
  } else {
    return (
      <div className="d-flex aligns-items-center justify-content-center">
        <div className="card w-50">
          <div className="card-header">
            School {id ? `nr: ${id} edit` : `creation`} page
          </div>
          <div className="card-body">
            <form onSubmit={(e) => (id ? updateItem(e) : createItem(e))}>
              <div className="my-2 text-danger">
                {status === null ? "" : status.message}
              </div>
              <div className="form-group d-grid gap-2">
                {/* INPUTS STARTS */}
                <label className="fw-bold">Name:</label>
                <input
                  className="form-control"
                  onChange={(e) => setItems({ ...items, name: e.target.value })}
                  onFocus={() => items.name ?? setItems({ ...items, name: "" })}
                  value={items.name ?? "New name"}
                />
                <label className="fw-bold">Address:</label>
                <input
                  className="form-control"
                  onChange={(e) =>
                    setItems({ ...items, address: e.target.value })
                  }
                  onFocus={() =>
                    items.address ?? setItems({ ...items, address: "" })
                  }
                  value={items.address ?? "New address"}
                />
                <label className="fw-bold">Code:</label>
                <input
                  className="form-control"
                  onChange={(e) => setItems({ ...items, code: e.target.value })}
                  onFocus={() => items.code ?? setItems({ ...items, code: "" })}
                  value={items.code ?? "New code"}
                />
                {/* INPUTS ENDS */}
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default School;
