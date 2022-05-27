import {useSelector} from 'react-redux'
import '../styles/Navbar.css'
import { bookingSchedule } from '../actions/auth';
import { toast } from 'react-toastify';
import '../styles/Footer.css'

const BookingCard =({day,list,uuid,tname}) =>{
       

  

    const {user} = useSelector((state) =>({...state}));
    
    const puid = user.user._id;
    const pname = user.user.name;

    const daylist = ["monday","tuesday","wednesday","thrusday","friday","saturday","sunday"];

   
    let flag = new Date(Date.now()).getDay() - 1;
    

    const handleClick = async (e)=>{

      if(!(daylist[flag] == day))
      {
        toast.dark("Only todays booking allowed");
        return;
      }
      const detail = e.target.innerText;

      var hour = new Date(Date.now()).getHours();

      if(hour <= 9)
      hour = "0" + hour;

      var min = new Date(Date.now()).getMinutes();

      if(min <= 1)
      min = "0" + min;

      const currentTime =  hour+ ":"+ min;

      console.log(currentTime);

   
      if(currentTime > detail)
      { toast.dark(`Booking Allowed after ${currentTime}`);   return;}
      

      var month = new Date().getMonth();
      if(month <= 9)
      month = "0"+month;
      
      const time=detail.substring(0,5)+":"+new Date().getDate() + ":" + month+":"+new Date().getFullYear();
      const status = false;
    
      try{
      const data = await bookingSchedule({time,status,uuid,puid,pname,tname});
      toast.success("Booked");
      
      }
      catch(err)
      {
        toast.dark(err.message);
      }
    }


    return (<>
    
        <div className="col-sm-4 p-3 text-center  gridalign">
   <div className="card background-cadet" style={{width: '18rem',height:'23rem'}}>

   {daylist[flag] == day ?<h2 className='pt-3 tophead text-sans text-success'>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>:<h2 className='pt-3 text-sans tophead'>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>}

  <ul className="list-group list-group-flush">

    {list!=null &&  list.map((list) =><li className="list-group-item cursor"  onClick={handleClick}>{(list[0] >= '1' && list[1] >= '2')||(list[0]>=2)?list+" PM":list+" AM"}</li>)}

  </ul>
  </div>
  </div>

    </>)
}

export default BookingCard;