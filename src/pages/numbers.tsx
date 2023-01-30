import { NextPage } from "next";
import { useState, useEffect } from "react";
import useSWR from "swr";
import getConfig from "next/config";
import "../styles/style.scss";

const { publicRuntimeConfig } = getConfig();
const { BACKEND_API } = publicRuntimeConfig;

interface Props {
  numbers: string[];
}

const NumberPage: NextPage<Props> = () => {
  const [numbers, setNumbers] = useState([]);
  const [number, setNumber] = useState("");
  const [average, setAverage] = useState<number | undefined>(undefined);

  const { data, error, mutate } = useSWR(
    `${BACKEND_API}/number`,
    async (url) => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        return json;
      } catch (err) {
        console.error(err);
      }
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_API}/number`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });
      if (res.ok) {
        const submitData = await res.json();
        const { averageNumber } = submitData;
        setAverage(averageNumber);
        setNumber("");
        mutate();
      } else {
        console.log("Server responded with error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setNumbers(data.numbers);
    }
  }, [data]);

  useEffect(() => {
    const lastTwoNumbers = numbers.slice(-2);
    if (lastTwoNumbers.length === 2) {
      const avg = (lastTwoNumbers[0] + lastTwoNumbers[1]) / 2;
      setAverage(avg);
    }
  }, [numbers]);

  return (
    <div className="main second-page">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Post a number</button>
      </form>
      <br />
      {error && <div>Failed to load numbers</div>}
      {!data && <div>Loading...</div>}
      {data && console.log(data)}
      {data && (
        <div>
          <ul>
            {numbers && numbers.length ? (
              numbers.map((el: string, i: number) => (
                <li key={i}>
                  {i + 1}: {el}
                </li>
              ))
            ) : (
              <h5>No numbers yet</h5>
            )}
          </ul>
          <section>
            {average ? (
              <p>Average of last two numbers is {average}</p>
            ) : (
              <p>Provide at least two numbers to calculate average</p>
            )}
          </section>
        </div>
      )}
      <footer>
        <a href="/">Back to the main page</a>
      </footer>
    </div>
  );
};

export default NumberPage;
