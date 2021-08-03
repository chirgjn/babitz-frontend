import withAuth from "./withAuth";
import { useEffect, useState } from "react";

function Edit(props) {
  console.log(props);
  const closeModal = () => {
    document.getElementById("restForm").reset();
  };
  return (
    <div>
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={closeModal}
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
              <h4 className="modal-title">{props.modalname}</h4>
            </div>
            <form id="restForm">
              <div className="modal-body">
                {props.modaltype == "text" ? (
                  <input
                    type="text"
                    onChange={(e) => props.changefunc(e.target.value)}
                    className="form-control"
                    defaultValue={props.changetype}
                    placeholder={props.modalname}
                    required
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => props.changefunc(e.target.value)}
                    className="form-control"
                    placeholder={props.modalname}
                    required
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  Save For Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Edit);
