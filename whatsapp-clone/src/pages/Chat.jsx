import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from "../firebase";
import { useSelector } from "react-redux";
import Navbar from "../components/NavBar";

export default function Chat() {
  const { userId } = useParams();
  const { user } = useSelector(s => s.auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);

  const chatId = [user.uid, userId].sort().join("_");

  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: user.uid,
      text: input,
      timestamp: serverTimestamp()
    });
    setInput("");
  };

  const formatTime = timestamp => {
    if (!timestamp?.toDate) return "";
    return new Date(timestamp.toDate()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4 d-flex flex-column" style={{height: "80vh"}}>
        <div className="chat-window flex-grow-1 mb-3" ref={chatWindowRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`d-flex mb-2 ${msg.senderId === user.uid ? "justify-content-end" : "justify-content-start"}`}>
              <div className={`chat-message ${msg.senderId === user.uid ? "sent" : "received"}`}>
                <div>{msg.text}</div>
                {msg.timestamp && <small className="text-muted d-block text-end">{formatTime(msg.timestamp)}</small>}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="d-flex">
          <input
            className="form-control chat-input me-2"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="btn btn-success">Send</button>
        </form>
      </div>
    </>
  );
}
