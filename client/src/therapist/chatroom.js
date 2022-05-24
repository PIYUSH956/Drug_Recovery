import io from 'socket.io-client'
import './chatroom.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';
const socket = io.connect("http://localhost:8003");
const ChatRoom = () => {

    const id = useParams().id;
    const {user} = useSelector((state) => ({...state}));
       console.log(user);
    const username = user.user.name;
    const room = id;
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [flag, setFlag] = useState(true);

    var send = true;
    var rec = true;

    const joinRoom = () => {

        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            console.log("User with room id", room);
            setFlag(false);
        }
    }

    const sendMessage = async () => {
        if (message !== "") {
            console.log(username);
            const messageData = {
                message: message,
                room: room,
                author: username,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }
    var double = true;
    useEffect(() => {
        if (double) {
            socket.on("receive_message", (data) => {
                console.log(data.message);
                setMessageList((list) => [...list,data]);
            })
            console.log(messageList);
        }
       
        double = double ? false : true;
    }, [socket]);


    return (
        <>

            {flag && <div className="row chat-background" style={{ marginTop: "80px" }}>
                <div className="col center">
                    <div className="card" style={{ width: '18rem' }}>

                        <div className="card-body overflow-auto text-white background-violet">
                            <input type="text" placeholder="John..." value={username} disabled />
                            <input type="text" placeholder="ROOM ID..." value={room} disabled />
                            <p className="card-text">Join Chat to start Chatting</p>
                            <button class="btn btn-primary background-violet" onClick={joinRoom} > Join Chat</button>
                        </div>


                    </div>
                </div>
            </div>}

            {!flag && <div className="row" style={{ marginTop: "100px" }}>
                <div className="col center">
                    <div className="card cards border border-success" style={{ width: '700px' }}>
                        <div className="card cards">
                            <div className="card-header card-headera msg_head">
                                <div className="d-flex bd-highlight">
                                    <div className="img_cont">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg " class="rounded-circle user_img" />
                                        <span className="online_icon"></span>
                                    </div>
                                    <div className="user_info">
                                        <span>Chat with Doctor</span>
                                    </div>

                                </div>

                            </div>
                            <div class="card-body msg_card_body">

                               



                            {messageList.map((msg) => {
                                return (
                                <div className="d-flex justify-content-end mb-4">
                                    
                                <div className="msg_cotainer_send">
                                    {msg.message}
                                    <span class="msg_time_send">{msg.time}</span>
                                    
                                </div>
                                
                                <div className="img_cont_msg">
                                    {msg.auth}
                                </div>
                            </div>)})}

                            </div>
                            <div className="card-footer">
                                <div className="input-group">
                                    <div className="input-group-append">
                                        <span className="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
                                    </div>
                                    <input tyoe="text" class="form-control type_msg" placeholder="Type your message..." onChange={(e) => { setMessage(e.target.value) }}/>
                                    <div className="input-group-append">
                                        <button className="input-group-text send_btn"><i class="fas fa-location-arrow" onClick={sendMessage}>Send Message</i></button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <input type="text" placeholder="message" onChange={(e) => { setMessage(e.target.value) }} />
                        <button class="btn btn-primary" onClick={sendMessage} > Send Message</button> */}
                    </div>

                </div>
            </div>}



        </>
    )

}



export default ChatRoom;