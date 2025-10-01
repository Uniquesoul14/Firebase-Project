import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../slices/usersSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { db, collection, query, orderBy, onSnapshot } from "../firebase";

export default function Home() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(s => s.users);
  const { user } = useSelector(s => s.auth);
  const [lastMessages, setLastMessages] = useState({});

  useEffect(() => {
    if (user) dispatch(fetchUsers(user.uid));
  }, [dispatch, user]);

  useEffect(() => {
    users.forEach(u => {
      const chatId = [user.uid, u.uid].sort().join("_");
      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, snapshot => {
        if (!snapshot.empty) {
          setLastMessages(prev => ({ ...prev, [u.uid]: snapshot.docs[0].data() }));
        }
      });
      return () => unsubscribe();
    });
  }, [users, user]);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h4>Users</h4>
        {loading && <p>Loading...</p>}
        <div className="list-group">
          {users.map(u => {
            const lastMsg = lastMessages[u.uid];
            const lastText = lastMsg?.text || "Say hi!";
            const lastTime = lastMsg?.timestamp?.toDate
              ? new Date(lastMsg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
              : "";

            return (
              <Link to={`/chat/${u.uid}`} className="list-group-item list-group-item-action" key={u.uid}>
                <div className="d-flex align-items-center">
                  <img
                    src={u.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    className="rounded-circle me-3"
                    width={50} height={50}
                  />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0">{u.name}</h6>
                      <small className="text-muted">{lastTime}</small>
                    </div>
                    <small className="text-muted">{lastText}</small>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
