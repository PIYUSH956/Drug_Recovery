import { useSelector,userSelector,useStore } from "react-redux"
import cover from "./images/cover.jpg"
import appcover from "./images/app_cover.jpg"
import recordcover from "./images/recover.jpg"
import '../styles/Dashboard.css'
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const DashBoard =() =>{

    const {user}= useSelector((state) => ({...state}));



    return (
       <>
       <div className="dashboard">
        <h1 className=" dash_head  mb-2 px-5 pt-5 ">Dashboard</h1>
            
        <div className="row my-2">
        <div className="card col justify-content-center m-5 p-2" style={{width: '18rem'}}>
            <img src={cover} class="card-img-top" alt="..."/>
            <div className="card-body">
                <Link to="/therapist-detail" className="btn1 text-sans">Therapists</Link>
            </div>
            </div>
            <div className="card col m-5 p-2" style={{width: '18rem'}}>
            <img src={appcover} class="card-img-top" alt="..."/>
            <div className="card-body">
                <Link to="/patient-appointment" className="btn1 text-sans">Appointments</Link>
            </div>
            </div>
            <div className="card col m-5 p-2" style={{width: '18rem'}}>
            <img src={recordcover} class="card-img-top" alt="..." sytle={{height:'10'}}/>
            <div className="card-body">
                <Link to="/" className="btn1 text-sans text-violet">Medical Records</Link>
            </div>
            </div>
        </div>
            </div>
            <Footer/>
        </>
    )
}
export default DashBoard