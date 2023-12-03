/* eslint-disable react/prop-types */
import trash_icon from "./assets/trash_icon.svg";
import edit_icon from "./assets/edit_icon.svg";
import check_icon from "./assets/check_icon.svg";
import cross_icon from "./assets/cross_icon.svg";
import { useState } from "react";
import { useEffect } from "react";

function Entry({
  user,
  setData,
  data,
  setSelectedRows,
  selectedRows,
  setAllSelect,
  allSelect,
  setEditing,
  editing,
}) {
  const [selected, setSelected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  useEffect(() => {
    if (allSelect) setSelected(true);
  }, [allSelect]);

  return (
    <tr className="bg-secondary">
      <td scope="row" className="align-middle">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked={selected}
          onChange={() => {
            if (selected) setAllSelect(false);
            setSelected(!selected);
            let rows = [...selectedRows];
            if (!selected) {
              rows.push(user.id);
            } else {
              rows.splice(rows.indexOf(user.id), 1);
            }
            setSelectedRows(rows);
          }}
          disabled={editing}
        />
      </td>
      {editMode ? (
        <>
          <td className="align-middle">
            <input
              type="text"
              className="form-control  m-0"
              placeholder={user.name}
              aria-label="Username"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </td>
          <td className="align-middle">
            <div className="input-group m-0">
              <input
                type="text"
                className="form-control"
                placeholder={user.email.substring(0, user.email.indexOf("@"))}
                aria-label="email"
                onChange={(event) => {
                  setEmail(`${event.target.value}@mailinator.com`);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text">@mailinator.com</span>
              </div>
            </div>
          </td>
          <td className="align-middle">
            <select
              className="form-select m-0"
              aria-label="Select role"
              onChange={(event) => {
                setRole(event.target.value);
              }}
              defaultValue={user.role}
            >
              <option value="admin">admin</option>
              <option value="member">member</option>
              <option value="guest">guest</option>
            </select>
          </td>
        </>
      ) : (
        <>
          <td className="align-middle">{user.name}</td>
          <td className="align-middle">{user.email}</td>
          <td className="align-middle">{user.role}</td>
        </>
      )}

      <td className="align-middle">
        {editMode ? (
          <>
            <button
              className="btn btn-success action-button"
              onClick={() => {
                let newData = data;
                newData.forEach((row) => {
                  if (row.id == user.id) {
                    row.name = name;
                    row.email = email;
                    row.role = role;
                  }
                });
                setData(newData);
                setEditing(false);
                setEditMode(false);
              }}
            >
              <img src={check_icon} className="svg-icon-white action-image" />
            </button>
            <button
              className="btn btn-danger action-button"
              onClick={() => {
                setName(user.name);
                setEmail(user.email);
                setRole(user.role);
                setEditing(false);
                setEditMode(false);
              }}
            >
              <img src={cross_icon} className="svg-icon-white action-image" />
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-outline-primary action-button"
              onClick={() => {
                setEditing(true);
                setEditMode(true);
              }}
              disabled={editing}
            >
              <img src={edit_icon} className="svg-icon-primary action-image" />
            </button>
            <button
              className="btn btn-danger action-button"
              onClick={() => {
                let newData = data.filter((row) => user.id != row.id);
                setData(newData);
              }}
              disabled={editing}
            >
              <img src={trash_icon} className="svg-icon-white action-image" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export default Entry;
