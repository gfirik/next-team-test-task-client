import { Data } from "@/app/page";
import Link from "next/link";
import { Message } from "@/app/page";

interface MainPageProps {
  data: Data;
}

const MainPage = (props: MainPageProps) => {
  const { messages, numbers } = props.data.data;
  return (
    <div className="main">
      <nav>
        <Link href="messages">View messages</Link>
        <Link href="/numbers">View numbers</Link>
      </nav>

      <div className="content">
        <div className="">
          <h3 className="">Messages</h3>
          <ul className="">
            {messages ? (
              messages.map((message: Message, i: number) => (
                <li key={i} className="">
                  {message.author}: {message.message}
                </li>
              ))
            ) : (
              <p>No messages yet</p>
            )}
          </ul>
        </div>
        <div>
          <h3 className="">Numbers</h3>
          <ul className="">
            {numbers ? (
              numbers.map((number: string, i: number) => (
                <li key={i} className="">
                  {number}
                </li>
              ))
            ) : (
              <p>No numbers yet</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
