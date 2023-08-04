import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styles from "../styles/Chat.module.css";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import { IUserData, IUser } from "../types/types";
import { Messages } from "../components/Messages";

// const socket = io("http://localhost:5000");
const socket = io("https://chat-biri.onrender.com");

export const Chat = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<IUserData[]>([]);
  const { search } = useLocation();
  const [params, setParams] = useState<IUser>({ room: "", name: "" });
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<number>(0);

   useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    const newParams = {
      room: searchParams.room || "",
      name: searchParams.name || "",
    };
    setParams(newParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data } ) => {
      setState((prev) => [...prev, data]);
    });
  }, []);

   useEffect(() => {
     socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);



  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    socket.emit("sendMessage", { message, params });
    setMessage("");
  };

  const handleEmojiClick = ({ emoji }: EmojiClickData): void => {
    setMessage(`${message} ${emoji}`);
  };

 
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>{params.room}</h1>
        <p className={styles.users}>{users} users in this room</p>
        <button type="button" className={styles.left} onClick={leftRoom}>
          left the room
        </button>
      </header>
      <Messages messages={state} name={params.name} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            value={message}
            autoComplete="off"
            placeholder="Write message"
            required
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <BsFillEmojiHeartEyesFill className={styles.emoji} />
        </button>

        {isOpen && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        <button className={styles.button} type="submit">
          Send a message
        </button>
      </form>
    </div>
  );
};
