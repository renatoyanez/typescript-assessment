import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import { IFakeApiData } from "types/models/fakeApi";
import { useGetBitcoinHistoryData, useGetBitcoinSixMonths, useGetFakeApiData } from "./hooks";
import ReactEcharts from "echarts-for-react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  FirstDataRenderedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./App.css";

const App = () => {
  const { bitcoinHistory } = useGetBitcoinHistoryData();
  const { bitcoinHistory: sixMonths } = useGetBitcoinSixMonths();
  const {data} = useGetFakeApiData()

  const [colDefs, setColDefs] = useState<ColDef<IFakeApiData>[]>(
    [] as ColDef<IFakeApiData>[]
  );

  const parseDataforGrid = () => {
    if (data.length) {
      const dataItem = data[0];
      const keys = Object.entries(dataItem).map(([key]) => ({
        field: key,
      }));
      setColDefs(keys as [] as ColDef<IFakeApiData>[]);
    }
  };

  useEffect(() => {
    parseDataforGrid();
    return () => {
      setColDefs([] as ColDef<IFakeApiData>[])
    };
  }, [data]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <Container>
      <ReactEcharts lazyUpdate={true} option={bitcoinHistory} />
      <ReactEcharts lazyUpdate={true} option={sixMonths} />
      <div className="ag-theme-quartz-dark" style={{ height: "500px" }}>
        <AgGridReact<IFakeApiData>
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </Container>
  );
};

export default App;
