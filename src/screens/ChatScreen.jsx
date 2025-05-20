import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatScreen() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.displayName || parsedUser.email || "Customer");
      } catch (err) {
        console.error("Error parsing user", err);
      }
    }
  }, []);

// Real-time listener for chat messages
  useEffect(() => {
    const q = query(collection(db, "chatMessages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  //  Send message to Firestore
  const handleSend = async () => {
    if (!username || !message) return;

    try {
      await addDoc(collection(db, "chatMessages"), {
        user: username,
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-[80vw] h-[85vh] bg-white shadow-xl rounded-3xl p-8 flex flex-col justify-between relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-800 hover:cursor-pointer transition"
            >
              ✖
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold text-green-700 tracking-wide">
              🌿 AyurLanka Chat
            </h2>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mt-4 mb-6 px-1 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="text-sm bg-gray-100 px-4 py-2 rounded-xl shadow-sm max-w-[80%]"
                >
                  <span className="font-semibold text-green-800">
                    {msg.user}
                  </span>
                  <div className="text-gray-700">{msg.text}</div>
                </div>
              ))}
            </div>

            {/* Input Fields */}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className="flex-[1] bg-gray-100 px-4 py-2 rounded-full focus:outline-none text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled
              />
              <input
                type="text"
                className="flex-[3] bg-gray-100 px-4 py-2 rounded-full focus:outline-none text-sm"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm hover:cursor-pointer font-medium shadow-md transition"
              >
                🍃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white p-4 rounded-full shadow-xl z-50 transition-all duration-200"
        >
          💬
        </button>
      )}
    </>
  );
}
