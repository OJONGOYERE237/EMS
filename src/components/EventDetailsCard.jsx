import React from 'react'
import { useUserContext } from '../context/userContext'

const EventDetailsCard = ({item}) => {
  const eventDetailsCardStyle = {
    cursor: 'pointer',

  }
    
  return (
    <div>
        <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: 'pointer',
        backgroundColor: "#fff",
      }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0", fontSize: "16px", color: '#539231' }}>{item.title}</h3>
        <p style={{ margin: "5px 0", color: "#555", color: '#79777e', fontSize:'small' }}>{item.organizer}</p>
      </div>
      <strong style={{ fontSize: "18px", color: "#333" }}>{item.price}</strong>
    </div>
      
    </div>
  )
}

export default EventDetailsCard
