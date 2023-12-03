/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Entry from "./Entry";
import SearchBar from "./SearchBar";
import trash_icon from "./assets/trash_icon.svg";

const tableHoverClass = "table table-hover rounded";
const tableNormalClass = "table table-borderless table-rounded";
const currBtnClass = "btn btn-primary";
const allBtnClass = "btn btn-outline-secondary";
const numEntriesShown = 10;
const maxPageNumShown = 5;

function Dashboard({ data, setData }) {
  const [allSelect, setAllSelect] = useState(false);
  const [moreOnLeft, setMoreOnLeft] = useState(false);
  const [moreOnRight, setMoreOnRight] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [nums, setNums] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let startEntry = pageNumber * numEntriesShown;
    let endEntry = Math.min(
      (pageNumber + 1) * numEntriesShown,
      filteredData.length
    );
    if (startEntry >= filteredData.length) {
      setPageNumber((prev) => Math.max(prev - 1, 0));
      startEntry = pageNumber * numEntriesShown;
      endEntry = Math.min(
        (pageNumber + 1) * numEntriesShown,
        filteredData.length
      );
    }
    let currData = [];
    for (let i = startEntry; i < endEntry; i++) currData.push(filteredData[i]);
    setPagedData(currData);
    setTotalPages(Math.ceil(filteredData.length / numEntriesShown));
    setSelectedRows([]);
    setAllSelect(false);
    setEditing(false);

    let currNums = [];
    if (totalPages <= maxPageNumShown) {
      for (let i = 1; i <= totalPages; i++) currNums.push(i);
    } else {
      let startNum = pageNumber + 1 - Math.floor(maxPageNumShown / 2);
      let endNum = pageNumber + 1 + Math.floor(maxPageNumShown / 2);
      if (startNum < 1) {
        startNum = 1;
        endNum = maxPageNumShown;
      }
      if (endNum >= totalPages) {
        startNum = Math.max(totalPages - maxPageNumShown + 1, 1);
        endNum = Math.max(totalPages, 1);
      }
      for (let i = startNum; i <= endNum; i++) currNums.push(i);
      setMoreOnLeft(startNum > 1);
      setMoreOnRight(endNum < totalPages);
    }
    setNums(currNums);
  }, [filteredData, pageNumber, totalPages]);

  useEffect(() => {
    if (search == undefined || search == "") {
      setFilteredData(data);
    } else {
      let newData = data.filter((row) => {
        return (
          row.name.toLowerCase().includes(search) ||
          row.email.toLowerCase().includes(search) ||
          row.role.toLowerCase().includes(search)
        );
      });
      setFilteredData(newData);
    }
  }, [search, data]);

  return (
    <>
      <div className="container p-5">
        <SearchBar setSearch={setSearch} />
        <div className="card p-3 mb-3 scroll">
          {pagedData != undefined && pagedData.length == 0 ? (
            <p id="noRecord">No Records Found!</p>
          ) : (
            <div className="table-responsive">
              <table
                className={
                  pagedData.length == 0 ? tableNormalClass : tableHoverClass
                }
              >
                <thead>
                  <tr>
                    <th scope="col">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={allSelect}
                        onChange={() => {
                          setAllSelect(!allSelect);
                          setSelectedRows(() => {
                            return pagedData.map((row) => row.id);
                          });
                        }}
                        disabled={editing}
                      />
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((user) => (
                    <Entry
                      user={user}
                      setData={setData}
                      data={data}
                      setSelectedRows={setSelectedRows}
                      selectedRows={selectedRows}
                      setAllSelect={setAllSelect}
                      allSelect={allSelect}
                      setEditing={setEditing}
                      editing={editing}
                      key={user.id}
                    />
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-between align-items-center flex-wrap-reverse p-0 m-0">
                <div className="d-flex justify-content-start align-items-center p-0 m-0">
                  <small className=" text-secondary m-3">
                    {selectedRows.length} of {pagedData.length} row(s) selected.
                  </small>
                  <button
                    className="btn btn-danger action-button"
                    disabled={selectedRows.length == 0}
                    onClick={() => {
                      let newData = filteredData.filter(
                        (user) => selectedRows.indexOf(user.id) == -1
                      );
                      setData(newData);
                    }}
                  >
                    <img
                      src={trash_icon}
                      className="svg-icon-white action-image"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-end align-items-center p-0 m-0">
                  <small className="m-3">
                    Page {pageNumber + 1} of {totalPages}
                  </small>
                  <div className="btn-group">
                    <button
                      className={allBtnClass}
                      aria-label="Start"
                      onClick={() => {
                        setPageNumber(0);
                      }}
                      disabled={pageNumber == 0}
                    >
                      <span aria-hidden="true" className="sr-only">
                        &laquo;
                      </span>
                    </button>
                    <button
                      className={allBtnClass}
                      aria-label="Previous"
                      onClick={() => {
                        setPageNumber((prev) => Math.max(prev - 1, 0));
                      }}
                      disabled={pageNumber == 0}
                    >
                      <span aria-hidden="true" className="sr-only">
                        &lsaquo;
                      </span>
                    </button>
                    {moreOnLeft && (
                      <button
                        className={allBtnClass}
                        aria-label="More To The Left"
                        disabled
                      >
                        <span aria-hidden="true" className="sr-only">
                          ...
                        </span>
                      </button>
                    )}
                    {nums.map((num) => (
                      <button
                        key={num}
                        className={
                          num - 1 == pageNumber ? currBtnClass : allBtnClass
                        }
                        onClick={() => {
                          setPageNumber(num - 1);
                        }}
                      >
                        {num}
                      </button>
                    ))}
                    {moreOnRight && (
                      <button
                        className={allBtnClass}
                        aria-label="More To The Right"
                        disabled
                      >
                        <span aria-hidden="true" className="sr-only">
                          ...
                        </span>
                      </button>
                    )}
                    <button
                      className={allBtnClass}
                      aria-label="Next"
                      onClick={() => {
                        setPageNumber((prev) =>
                          Math.min(prev + 1, totalPages - 1)
                        );
                      }}
                      disabled={pageNumber == totalPages - 1}
                    >
                      <span aria-hidden="true" className="sr-only">
                        &rsaquo;
                      </span>
                    </button>
                    <button
                      className={allBtnClass}
                      aria-label="End"
                      onClick={() => {
                        setPageNumber(totalPages - 1);
                      }}
                      disabled={pageNumber == totalPages - 1}
                    >
                      <span aria-hidden="true" className="sr-only">
                        &raquo;
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
