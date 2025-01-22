import React from 'react'
import { useEventContext } from '../../../context/eventContext'
import '../../../Styles/myEvents.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
    const navigate = useNavigate();
    const { state: { events } } = useEventContext()
    const tableHeader = ["title", "category", "location", "startdate", "enddate", "status", "actions"]
    const getTime = (timestamp) => {
    }

    return (
        <div className='wholeMyEventsdiv'>
            <div className='inputdiv'>
                <input className='myeventsInput' type="text" placeholder='Search Event ' />
                <button className='inputButton'>Search</button>
            </div>
            <div 
            className='addButton'
            onClick={()=> navigate('/createEventPage')}
            >
                <AddIcon />
                Add
            </div>

            <div className='myEventstable'>
                {/* this is the myevents page */}
                {/* {events.map((event) =>(
        <div key={event.id}>
            <p>{event.title} </p>
            <p>{event.category} </p>
        
        </div>
      ))} */}
                <table>
                    <thead>
                        {tableHeader.map((thElement) => (
                            <th className='tableHeader' key={thElement}>{thElement}</th>
                        ))}
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.category}</td>
                                <td>{event.location}</td>
                                {/* <td> {event.startdate} </td>
                            <td> {event.enddate} </td> */}
                                <td> startdate </td>
                                <td> enddate </td>
                                <td>Pending</td>
                                <td style={{}}>
                                    <VisibilityIcon className='VisibilityIcon'/>
                                    <EditIcon className='EditIcon'/>
                                    <DeleteIcon className='DeleteIcon'/>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default MyEvents
