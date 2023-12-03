import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Header from "./Header";
import "./styles.css";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

async function getData() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <Header />
      <Dashboard data={data} setData={setData} />
      <Footer />
    </>
  );
}

export default App;
