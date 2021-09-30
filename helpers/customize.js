import { useEffect, useState } from "react";
import Style from "../styles/myModal.module.css";
function Edit(props) {
  const closeModal = () => {
    props.setEditable(false);
    document.getElementById("restForm").reset();
  };
  return (
    <div>
      <div id={Style.myModal} class={Style.modal}>
        <div class={Style.modalContent}>
          <div class={Style.modalHeader}>
            <span class={Style.close} onClick={closeModal}>
              &times;
            </span>
            <h2>{props.modalname}</h2>
          </div>
          <form id="restForm">
            <div className={Style.modalBody}>
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
                  onChange={(e) => props.changefunc(e.target.files[0])}
                  className="form-control"
                  placeholder={props.modalname}
                  required
                />
              )}
            </div>
            <div className={Style.modalFooter}>
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
  );
}
export default Edit;
