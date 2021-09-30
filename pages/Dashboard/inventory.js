import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import withAuth from "../../helpers/withAuth";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Sidenav from "../../components/Sidenav";
import styled from "styled-components";
import MaterialTable from "material-table";
import Profile from "../../components/Profile";
import Style from "../../styles/myModal.module.css";
//----------------styles

const Heading = styled.h4`
  /* margin-top:10px; */
  font-family: Oswald;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 50px;
  /* or 100% */
  text-align: center;
  letter-spacing: 0.03em;
  color: #4b4b60;
  cursor: pointer;
  /* border-bottom:10px solid #FBB300; */
  max-width: 200px;
`;
const Label = styled.label`
  float: left;
  color: #4b4b60;
  font-family: Oswald;
  letter-spacing: 3px;
`;
const SubmitButton = styled.button`
  background: #ffc535;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 25px;
  float: left;
  margin-top: 30px;
  width: 100%;
  color: #4b4b60;
  font-family: Oswald;
  letter-spacing: 3px;
  &:hover {
    color: #ffc535;
    background: #4b4b60;
  }
`;

function Inventory() {
  const [select, setSelect] = useState("add");
  const [itemname, setItemname] = useState("");
  const [itemprice, setItemprice] = useState(0);
  const [itemdescr, setItemdescr] = useState("");
  const [itemimage, setItemimage] = useState("");
  const [items, setItems] = useState([]);
  const [currentitem, setCurrentitem] = useState("");
  const [newitemname, setNewitemname] = useState("");
  const [newitemprice, setNewitemprice] = useState(0);
  const [newitemdescr, setNewitemdescr] = useState("");
  const [newitemstatus, setNewitemstatus] = useState(true);
  const [editable, setEditable] = useState(false);
  const user = firebase.auth().currentUser;
  useEffect(() => {
    async function getItems() {
      var requestOptions = {
        redirect: "follow",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.Aa,
        },
      };
      const response = await fetch(
        "https://babitz-backend.herokuapp.com/getItems",
        requestOptions
      );
      const list = await response.json();
      setItems(list);
    }
    getItems();
  }, [user.Aa]);

  function signOut() {
    // [START auth_sign_out]
    firebase
      .auth()
      .signOut()
      .then(() => {
        currentUser();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    // [END auth_sign_out]
  }
  const set_itemname = (event) => {
    setItemname(event.target.value);
  };
  const set_itemprice = (event) => {
    setItemprice(event.target.value);
  };
  const set_itemdescr = (event) => {
    setItemdescr(event.target.value);
  };
  const set_itemimage = (event) => {
    setItemimage(event.target.files[0]);
  };
  const set_newitemname = (event) => {
    setNewitemname(event.target.value);
  };
  const set_newitemprice = (event) => {
    setNewitemprice(event.target.value);
  };
  const set_newitemdescr = (event) => {
    setNewitemdescr(event.target.value);
  };
  const set_newitemstatus = (event) => {
    setNewitemstatus(eval(event.target.value));
  };
  const submit_item = (e) => {
    e.preventDefault();
    setEditable(false);
    var formdata = new FormData();
    formdata["name"] = itemname;
    formdata["price"] = Number(itemprice);
    formdata["description"] = itemdescr;
    var requestOptions = {
      method: "POST",
      body: JSON.stringify([formdata]),
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: user.Aa,
      },
    };
    fetch("https://babitz-backend.herokuapp.com/addItems", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        let add = items;
        add.push(json[0]);
        setItems(add);
        if (itemimage) {
          var formdata1 = new FormData();
          formdata1.append("file", itemimage);
          var requestOptions1 = {
            method: "POST",
            body: formdata1,
            redirect: "follow",
            headers: {
              Accept: "application/json",
              Authorization: user.Aa,
            },
          };
          fetch(
            "https://babitz-backend.herokuapp.com/itemImageUpload?itemId=" +
              json[0].id,
            requestOptions1
          )
            .then((response) => response.json())
            .then((json) => {})
            .catch((error) => {});
        }
      })
      .catch((error) => {});
    document.getElementById("inventoryForm").reset();
  };
  const edit_item = (rowData) => {
    setEditable(true);
    setCurrentitem(rowData);
    setNewitemname(rowData.name);
    setNewitemprice(rowData.price);
    setNewitemdescr(rowData.description);
  };
  const save_edit_item = (e) => {
    e.preventDefault();
    setEditable(false);
    var formdata = new FormData();
    formdata["name"] = newitemname;
    formdata["price"] = Number(newitemprice);
    formdata["description"] = newitemdescr;
    formdata["status"] = newitemstatus;
    var requestOptions = {
      method: "PATCH",
      body: JSON.stringify(formdata),
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: user.Aa,
      },
    };
    fetch(
      "https://babitz-backend.herokuapp.com/updateItems/?itemId=" +
        currentitem.id,
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        if (itemimage) {
          var formdata1 = new FormData();
          formdata1.append("file", itemimage);
          var requestOptions1 = {
            method: "POST",
            body: formdata1,
            redirect: "follow",
            headers: {
              Accept: "application/json",
              Authorization: user.Aa,
            },
          };
          fetch(
            "https://babitz-backend.herokuapp.com/itemImageUpload?itemId=" +
              json.id,
            requestOptions1
          )
            .then((response) => response.json())
            .then((json) => {})
            .catch((error) => {});
        }
        var requestOptions1 = {
          redirect: "follow",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.Aa,
          },
        };
        fetch("https://babitz-backend.herokuapp.com/getItems", requestOptions1)
          .then((response) => response.json())
          .then((json) => {
            setItems(json);
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };
  const delete_item = (id) => {
    var formdata = new FormData();
    var requestOptions = {
      method: "DELETE",
      body: formdata,
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: user.Aa,
      },
    };
    fetch(
      "https://babitz-backend.herokuapp.com/deleteItem/?id=" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => {
        var requestOptions1 = {
          redirect: "follow",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.Aa,
          },
        };
        fetch("https://babitz-backend.herokuapp.com/getItems", requestOptions1)
          .then((response) => response.json())
          .then((json) => {
            setItems(json);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        var requestOptions1 = {
          redirect: "follow",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.Aa,
          },
        };
        fetch("https://babitz-backend.herokuapp.com/getItems", requestOptions1)
          .then((response) => response.json())
          .then((json) => {
            setItems(json);
          })
          .catch((error) => {});
      });
  };
  return (
    <div>
      <Head>
        <title>Babtiz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
        />
      </Head>
      <div className="container-fluid">
        {editable === true ? (
          <div className={Style.modal} id={Style.myModal} role="dialog">
            <div className={Style.modalContent}>
              <div className={Style.modalHeader}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={() => setEditable(false)}
                >
                  &times;
                </button>
                <h4 className="modal-title">Edit Items</h4>
              </div>
              <form onSubmit={submit_item}>
                <div className="modal-body">
                  <Label>Item Name</Label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={set_newitemname}
                    defaultValue={currentitem.name}
                    placeholder="Food Item Name"
                    required
                  />
                  <Label>Item Price</Label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={set_newitemprice}
                    defaultValue={currentitem.price}
                    placeholder="Price in Rupees"
                    required
                  />
                  <Label>Item Description</Label>
                  <textarea
                    rows="5"
                    className="form-control"
                    onChange={set_newitemdescr}
                    defaultValue={currentitem.description}
                    placeholder="Food Item Description"
                    required
                  />
                  <Label>Item Image</Label>
                  <input
                    type="file"
                    onChange={set_itemimage}
                    accept="image/*"
                    className="form-control"
                  />
                  <Label>Item Status</Label>
                  <select
                    className="form-control"
                    required
                    onClick={set_newitemstatus}
                  >
                    <option value="true">Active</option>
                    <option value="false">Unactive</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={save_edit_item}
                  >
                    Save Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col-md-3">
            <Sidenav />
          </div>
          <div className="col-md-9">
            <div style={{ paddingBottom: "20px" }}>
              <Profile />
            </div>
            <center>
              <div className="row" style={{ marginTop: "100px" }}>
                <div className="col-xs-6">
                  {select == "add" ? (
                    <Heading
                      style={{ borderBottom: "10px solid #FBB300" }}
                      onClick={() => setSelect("add")}
                    >
                      Add Inventory
                    </Heading>
                  ) : (
                    <Heading onClick={() => setSelect("add")}>
                      Add Inventory
                    </Heading>
                  )}
                </div>
                <div className="col-xs-6">
                  {select == "list" ? (
                    <Heading
                      style={{ borderBottom: "10px solid #FBB300" }}
                      onClick={() => setSelect("list")}
                    >
                      List Of Inventory
                    </Heading>
                  ) : (
                    <Heading onClick={() => setSelect("list")}>
                      List Of Inventory
                    </Heading>
                  )}
                </div>
              </div>
              {(select == "list") & (items != []) ? (
                <MaterialTable
                  style={{
                    zIndex: "0",
                    position: "sticky",
                    borderBottom: "1px solid #B1B6C0",
                    borderLeft: "1px solid #B1B6C0",
                    borderRight: "1px solid #B1B6C0",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "5px",
                    marginTop: "50px",
                    fontFamily: "Oswald",
                    marginBottom: "50px",
                  }}
                  title="List Of All Exams"
                  columns={[
                    { title: "Item Name", field: "name" },
                    {
                      title: "Item Price",
                      field: "price",
                      render: (rowData) => <div>₹ {rowData.price}</div>,
                    },
                    {
                      title: "Availibility",
                      field: "Availibility",
                      render: (rowData) => (
                        <div>
                          {rowData.status == true ? (
                            <div style={{ color: "lightgreen" }}>Active</div>
                          ) : (
                            <div style={{ color: "red" }}>Unactive</div>
                          )}
                        </div>
                      ),
                    },
                    {
                      title: "Edit",
                      field: "Edit",
                      render: (rowData) => (
                        <div>
                          {" "}
                          <span
                            style={{
                              fontSize: "17px",
                              color: "grey",
                              cursor: "pointer",
                            }}
                            onClick={() => edit_item(rowData)}
                            data-toggle="modal"
                            data-target="#myModal"
                            className="glyphicon glyphicon-edit"
                          ></span>
                        </div>
                      ),
                    },
                    {
                      title: "Delete",
                      field: "Delete",
                      render: (rowData) => (
                        <div>
                          <span
                            style={{
                              fontSize: "17px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => delete_item(rowData.id)}
                            className="glyphicon glyphicon-trash"
                          ></span>
                        </div>
                      ),
                    },
                  ]}
                  data={items}
                  options={{
                    headerStyle: {
                      background:
                        "linear-gradient(180deg, rgba(248, 235, 209, 0.8) 28.13%, rgba(248, 235, 209, 0) 100%)",
                      color: "#4B4B60",
                      fontSize: "16px",
                      fontWeight: "Montserrat",
                    },
                    cellStyle: {
                      right: "30px",
                    },
                    toolbar: false,
                    search: false,
                    sorting: true,
                  }}
                />
              ) : (
                <form id="inventoryForm" onSubmit={submit_item}>
                  <div className="row" style={{ marginTop: "40px" }}>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5">
                      <Label>Item Name</Label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={set_itemname}
                        placeholder="Food Item Name"
                        required
                      />
                    </div>
                    <div className="col-sm-5">
                      <Label>Item Price</Label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={set_itemprice}
                        placeholder="Price in Rupees"
                        required
                      />
                    </div>
                    <div className="col-sm-1"></div>
                  </div>
                  <div className="row" style={{ marginTop: "30px" }}>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-5">
                      <Label>Item Description</Label>
                      <textarea
                        rows="5"
                        className="form-control"
                        onChange={set_itemdescr}
                        placeholder="Food Item Description"
                        required
                      />
                    </div>
                    <div className="col-sm-5">
                      <Label>Item Image</Label>
                      <input
                        type="file"
                        onChange={set_itemimage}
                        accept="image/*"
                        className="form-control"
                      />
                      <SubmitButton
                        style={{ outline: "none" }}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </SubmitButton>
                    </div>
                    <div className="col-sm-1"></div>
                  </div>
                </form>
              )}
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Inventory);
