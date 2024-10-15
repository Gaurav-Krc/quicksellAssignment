import React from "react";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import List from "../List/List";

import PlusIcon from "../../assets/add.svg";
import MenuIcon from "../../assets/3 dot menu.svg";
import HighIcon from "../../assets/Img - High Priority.svg";
import NoIcon from "../../assets/No-priority.svg";
import MidIcon from "../../assets/Img - Medium Priority.svg";
import LowIcon from "../../assets/Img - Low Priority.svg";
import UrgentIcon from "../../assets/SVG - Urgent Priority colour.svg";
import CrossIcon from "../../assets/Cancelled.svg";
import DoneIcon from "../../assets/Done.svg";
import BacklogIcon from "../../assets/Backlog.svg";
import ProgressIcon from "../../assets/in-progress.svg";
import TodoIcon from "../../assets/To-do.svg";

function Dashboard({
  statuses,
  priorities,
  priorityScores,
  grouping,
  ordering,
}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ tickets: [], users: [] });
  let prioritiesIcon = {
    4: UrgentIcon,
    3: HighIcon,
    2: MidIcon,
    1: LowIcon,
    0: NoIcon,
  };

  let statusIcon = {
    Backlog: <img src={BacklogIcon}></img>,
    Todo: <img src={TodoIcon}></img>,
    "In progress": <img src={ProgressIcon}></img>,
    Done: <img src={DoneIcon}></img>,
    Canceled: <img src={CrossIcon}></img>,
  };

  // fetch data from API
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [ticketMap, setTicketMap] = useState([]);

  function cmpTitle(a, b) {
    return a.title.localeCompare(b.title);
  }

  function cmpPriority(a, b) {
    return b.priority - a.priority;
  }

  let statusTicketMapTitle = () => {
    let obj = [];
    statuses.forEach((status) => {
      let tmp = [];
      data["tickets"].forEach((ticket) => {
        if (status === ticket.status) tmp.push(ticket);
      });
      tmp.sort(cmpTitle);
      obj.push(tmp);
    });
    setTicketMap(obj);
  };

  let statusTicketMapPriority = () => {
    let obj = [];
    statuses.forEach((status) => {
      let tmp = [];
      data["tickets"].forEach((ticket) => {
        if (status === ticket.status) tmp.push(ticket);
      });
      tmp.sort(cmpPriority);
      obj.push(tmp);
    });
    setTicketMap(obj);
  };

  let userTicketMapTitle = () => {
    let obj = [];
    data["users"].forEach((user) => {
      let tmp = [];
      data["tickets"].forEach((ticket) => {
        if (user.id === ticket.userId) tmp.push(ticket);
      });
      tmp.sort(cmpTitle);
      obj.push(tmp);
    });
    setTicketMap(obj);
  };

  let userTicketMapPriority = () => {
    let obj = [];
    data["users"].forEach((user) => {
      let tmp = [];
      data["tickets"].forEach((ticket) => {
        if (user.id === ticket.userId) tmp.push(ticket);
      });
      tmp.sort(cmpPriority);
      obj.push(tmp);
    });
    setTicketMap(obj);
  };

  let priorityTicketMapTitle = () => {
    let obj = [];
    priorityScores.forEach((priority) => {
      let tmp = [];
      data["tickets"].forEach((ticket) => {
        if (priority === ticket.priority) tmp.push(ticket);
      });
      tmp.sort(cmpTitle);
      obj.push(tmp);
    });
    setTicketMap(obj);
  };

  let priorityTicketMapPriority = () => {
    let obj = [];
    priorityScores.forEach((priority) => {
      let tmp = [];
      data["tickets"].forEach((ticket) => {
        if (priority === ticket.priority) tmp.push(ticket);
      });
      tmp.sort(cmpPriority);
      obj.push(tmp);
    });
    setTicketMap(obj);
  };

  useEffect(() => {
    if (grouping === "Status" && ordering === "Priority") {
      statusTicketMapPriority();
    } else if (grouping === "Status" && ordering === "Title") {
      statusTicketMapTitle();
    } else if (grouping === "User" && ordering === "Priority") {
      userTicketMapPriority();
    } else if (grouping === "User" && ordering === "Title") {
      userTicketMapTitle();
    } else if (grouping === "Priority" && ordering === "Priority") {
      priorityTicketMapPriority();
    } else if (grouping === "Priority" && ordering === "Title") {
      priorityTicketMapTitle();
    }
  }, [grouping, ordering]);

  useEffect(() => {
    if (grouping === "Status" && ordering === "Priority") {
      statusTicketMapPriority();
    } else if (grouping === "Status" && ordering === "Title") {
      statusTicketMapTitle();
    } else if (grouping === "User" && ordering === "Priority") {
      userTicketMapPriority();
    } else if (grouping === "User" && ordering === "Title") {
      userTicketMapTitle();
    } else if (grouping === "Priority" && ordering === "Priority") {
      priorityTicketMapPriority();
    } else if (grouping === "Priority" && ordering === "Title") {
      priorityTicketMapTitle();
    }
  }, [data]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="dashboard-main">
      {grouping === "Status" ? (
        ticketMap.map((ticketList, key) => {
          return (
            <div className="dashboard-list">
              <div className="dashboard-list-header-controls">
                <div className="dashboard-list-header-controls-info">
                  <div>{statusIcon[statuses[key]]}</div>
                  <b>
                    <p className="dashboard-list-header">{statuses[key]}</p>
                  </b>
                  <div className="dashboard-list-items-count">
                    {ticketList.length}
                  </div>
                </div>
                {ticketList.length !== 0 && (
                  <div>
                    <div>{<img src={PlusIcon}></img>}</div>
                    <div>{<img src={MenuIcon}></img>}</div>
                  </div>
                )}
              </div>
              <List
                key={key}
                ticketList={ticketList}
                userList={data["users"]}
                grouping={grouping}
              />
            </div>
          );
        })
      ) : grouping === "User" ? (
        ticketMap.map((ticketList, key) => {
          return (
            <div className="dashboard-list">
              <div className="dashboard-list-header-controls">
                <div className="dashboard-list-header-controls-info">
                  <div className="first-letter">
                    {data["users"][key].name
                      .split(" ")[0]
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <b>
                    <p className="dashboard-list-header">
                      {data["users"][key].name}
                    </p>
                  </b>
                  <div className="dashboard-list-items-count">
                    {ticketList.length}
                  </div>
                </div>
                {ticketList.length !== 0 && (
                  <div>
                    <div>{<img src={PlusIcon}></img>}</div>
                    <div>{<img src={MenuIcon}></img>}</div>
                  </div>
                )}
              </div>
              <List
                key={key}
                ticketList={ticketList}
                userList={data["users"]}
                grouping={grouping}
              />
            </div>
          );
        })
      ) : grouping === "Priority" ? (
        ticketMap.map((ticketList, key) => {
          return (
            <div className="dashboard-list">
              <div className="dashboard-list-header-controls">
                <div className="dashboard-list-header-controls-info">
                  <div>{<img src={prioritiesIcon[key]}></img>}</div>
                  <b>
                    <p className="dashboard-list-header">{priorities[key]}</p>
                  </b>
                  <div className="dashboard-list-items-count">
                    {ticketList.length}
                  </div>
                </div>
                {ticketList.length !== 0 && (
                  <div>
                    <div>{<img src={PlusIcon}></img>}</div>
                    <div>{<img src={MenuIcon}></img>}</div>
                  </div>
                )}
              </div>
              <List
                key={key}
                ticketList={ticketList}
                userList={data["users"]}
                grouping={grouping}
              />
            </div>
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Dashboard;
