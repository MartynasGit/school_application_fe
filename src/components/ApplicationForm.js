import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ApplicationForm = () => {
  let { id } = useParams();
  const [status, setStatus] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({ name: undefined });
  const [student, setStudent] = useState({ name: undefined });
  const auth = useContext(AuthContext);
  const url = process.env.REACT_APP_API_SERVER_URL;
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Bearer ${auth.getToken()}`,
  };
  //   console.log(auth.getUserId());

  useEffect(() => {
    if (id)
      fetch(`${url + "school/"}${id}`)
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
    let userId = auth.getUserId();
    console.log(userId);
    fetch(url + "application", {
      method: "POST",
      headers: hs,
      body: JSON.stringify({
        user_id: userId,
        school_id: id,
        full_name: student.name,
        id_code: student.id_code,
        grade: student.grade,
        bdate: student.bdate,
        confirmation: 0,
      }),
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (initialLoadError) {
    return <div>Error: {initialLoadError.message}</div>;
  } else {
    return (
      <>
        <h1 className="text-center my-3">Applying to {items.name} school</h1>
        <div className="d-flex aligns-items-center justify-content-center">
          <div className="card w-50">
            <div className="card-body">
              <form onSubmit={(e) => createItem(e)}>
                <div className="my-2 text-danger">
                  {status === null ? "" : status.message}
                </div>
                <div className="form-group d-grid gap-2">
                  {/* INPUTS STARTS */}
                  <label className="fw-bold">Child's Full Name:</label>
                  <input
                    className="form-control"
                    onChange={(e) =>
                      setStudent({ ...student, name: e.target.value })
                    }
                    placeholder="Full name here"
                  />
                  <label className="fw-bold">Grade:</label>
                  <input
                    className="form-control"
                    onChange={(e) =>
                      setStudent({ ...student, grade: e.target.value })
                    }
                    placeholder="Grade"
                  />
                  <label className="fw-bold">
                    National identification number:
                  </label>
                  <input
                    className="form-control"
                    onChange={(e) =>
                      setStudent({ ...student, id_code: e.target.value })
                    }
                    placeholder="ID number"
                  />
                  <label className="fw-bold">Date of birth:</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) =>
                      setStudent({ ...student, bdate: e.target.value })
                    }
                    placeholder="Date of birth"
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
      </>
    );
  }
};

export default ApplicationForm;
