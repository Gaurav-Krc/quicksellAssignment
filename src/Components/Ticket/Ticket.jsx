import React from "react";
import "./Ticket.css";

import HighIcon from "../../assets/Img - High Priority.svg";
import NoIcon from "../../assets/No-priority.svg";
import MidIcon from "../../assets/Img - Medium Priority.svg";
import LowIcon from "../../assets/Img - Low Priority.svg";
import UrgentIcon from "../../assets/SVG - Urgent Priority grey.svg";
import CrossIcon from "../../assets/Cancelled.svg";
import DoneIcon from "../../assets/Done.svg";
import BacklogIcon from "../../assets/Backlog.svg";
import ProgressIcon from "../../assets/in-progress.svg";
import TodoIcon from "../../assets/To-do.svg";
import DotIcon from "../../assets/dot.png";

function Ticket({ ticket, user, available, grouping }) {
  let prioritiesIcon = {
    4: <img src={UrgentIcon}></img>,
    3: <img src={HighIcon}></img>,
    2: <img src={MidIcon}></img>,
    1: <img src={LowIcon}></img>,
    0: <img src={NoIcon}></img>,
  };

  let statusIcon = {
    "Backlog": <img src={BacklogIcon}></img>,
    "Todo": <img src={TodoIcon}></img>,
    "In progress": <img src={ProgressIcon}></img>,
    "Done": <img src={DoneIcon}></img>,
    "Canceled": <img src={CrossIcon}></img>,
  };
  return (
    <div className="ticket-main">
      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        <div className="card-profile">
          <div className="card-profile-initial">
            {user[0]}
            {user[1]}
          </div>
          <div
            className={
              available
                ? "card-profile-initial-available card-profile-initial-available-true"
                : "card-profile-initial-available"
            }
          ></div>
        </div>
      </div>
      <div className="ticket-content">
        <div className="ticket-content-title">
          {grouping !== "Status" ? (
            <div className="ticket-tag-icon">{statusIcon[ticket["status"]]}</div>
          ) : (
            <></>
          )}
          <div className="ticket-title">
            <b>{ticket.title}</b>
          </div>
        </div>
      </div>
      <div className="ticket-metadata">
        <div className="ticket-tags">
          {grouping !== "Priority" ? (
            <div className="ticket-tag">
              <div className="ticket-tag-icon">
                {prioritiesIcon[ticket["priority"]]}
              </div>
            </div>
          ) : (
            <></>
          )}

          {ticket.tag.map((tag, key) => {
            return (
              <div key={key} className="ticket-tag">
                <div className="ticket-tag-img"><img src={DotIcon} alt="dot" /></div>
                <div>{tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
