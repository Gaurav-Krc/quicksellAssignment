import React from 'react'
import Ticket from '../Ticket/Ticket'

const List = ({ ticketList, userList ,grouping}) => {
    const userMap = new Map(userList.map(user => [user.id, user]));
    return (
      <div className='list-main'>
        {ticketList.map((ticket, key) => {
          const user = userMap.get(ticket.userId);
          return <Ticket key={key} ticket={ticket} user={user['name']} available = {user['available']} grouping={grouping} />
        })}
      </div>
    )
  }

export default List