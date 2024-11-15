import ReactEcharts from "echarts-for-react";
import { useGetBitcoinHistoryData } from "../hooks";

const Charts = () => {
  const { bitcoinHistory } = useGetBitcoinHistoryData(
    {
      symbol: "BTCUSDT",
      interval: "1d",
      limit: 30,
    },
    "line"
  );

  const { bitcoinHistory: sixMonths } = useGetBitcoinHistoryData(
    {
      symbol: "BTCUSDT",
      interval: "1d",
      limit: 180,
    },
    "scatter"
  );

  return (
    <div>
      <h3 style={{margin: '1rem 0 0 0'}}>Charts</h3>
      <div style={{ display: "flex", gap: ".5rem", padding: "1rem 0" }}>
        <section
          style={{
            width: "50%",
            border: "2px solid #8080804a",
            borderRadius: "1rem",
            margin: ".5rem",
          }}
        >
          <ReactEcharts
            style={{ padding: ".5rem" }}
            lazyUpdate={true}
            option={bitcoinHistory}
          />
        </section>
        <section
          style={{
            width: "50%",
            border: "2px solid #8080804a",
            borderRadius: "1rem",
            margin: ".5rem",
          }}
        >
          <ReactEcharts
            style={{ padding: ".5rem" }}
            lazyUpdate={true}
            option={sixMonths}
          />
        </section>
      </div>
    </div>
  );
};

export default Charts;
