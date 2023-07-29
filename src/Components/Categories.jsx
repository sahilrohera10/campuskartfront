import React from 'react'
import './Categories.css';
import RespElectronicsGif from '../Images/RespElectronicsGif.gif';
import books from '../Images/books.png'
import furniture from '../Images/furniture.png'
import electronics from '../Images/electronics.png'
import stationery from '../Images/stationery.png'
import connect from '../Images/connect.png'
const Categories = () => {
    const clients = [
        {
          img: books,
          name:"Books"
        },
        {
          img:stationery,
          name:"Stationery"
        },
        {
          img: furniture,
          name:"Furniture"
        },
        {
          img: electronics,
          name:"Electronics"
        },
        // {
        //     img: connect,
        //     name:"Connect"
        //   }
      ];
  return (
    <div className='categories-body'>
        <span className='c-head'>Shop Our Top Categories</span>
        <div className="c-card-section">
        {clients.map((client) => {
          return (
              <div className="c-card">
                <span>{client.name}</span>
                <img src={client.img} alt="" />
                
              </div>
          );
        })}
        </div>
        

    </div>
  )
}

export default Categories