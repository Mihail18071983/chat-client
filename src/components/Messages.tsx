import styles from "../styles/Messages.module.css";
import { IUserData } from "../types/types";

interface IProps {
  messages: IUserData[];
  name: string;
}

export const Messages = ({ messages, name }: IProps) => {
  if (!messages || !Array.isArray(messages)) {
    return <p>No messages to display.</p>;
  }
  return (
    <ul className={styles.messages}>
      {messages.map(({ user, message }: IUserData, i: number) => {
        const itsMe =
          typeof user.name === "string" &&
          user?.name.trim().toLowerCase() === name?.trim().toLowerCase();
        const className = itsMe ? styles.me : styles.user;

        return (
          <li key={i} className={`${styles.message} ${className}`}>
            <h3 className={styles.user}>{user.name}</h3>
            <p className={styles.text}>{message}</p>
          </li>
        );
      })}
    </ul>
  );
};
