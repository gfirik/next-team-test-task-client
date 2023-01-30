import { NextPage } from "next";
import { useState } from "react";
import getConfig from "next/config";
import "../styles/style.scss";

const { publicRuntimeConfig } = getConfig();
const { BACKEND_API } = publicRuntimeConfig;

interface Message {
  message: string;
  author: string;
}
interface Props {
  messages: Message[];
}

const MessagePage: NextPage<Props> = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(props.messages);
  const [author, setAuthor] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_API}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, author }),
      });
      const data = await res.json();
      setMessages([...messages, data]);
      setMessage("");
      setAuthor("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main second-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Post message</button>
      </form>
      <br />
      <ul>
        {messages ? (
          messages?.map((message, i) => (
            <li key={i}>
              {message.author} : {message.message}
            </li>
          ))
        ) : (
          <h5>No messages yet</h5>
        )}
      </ul>

      <footer>
        <a href="/">Back to the main page</a>
      </footer>
    </div>
  );
};

MessagePage.getInitialProps = async (ctx: any) => {
  const res = await fetch(`${BACKEND_API}/message`);
  const data = await res.json();
  return { messages: data.messages };
};

export default MessagePage;
