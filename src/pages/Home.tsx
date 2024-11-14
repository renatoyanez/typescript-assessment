import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { IFakeApiData } from "types/models/fakeApi";
import { useGetBitcoinHistoryData, useGetFakeApiData } from "../hooks";
import ReactEcharts from "echarts-for-react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, FirstDataRenderedEvent } from "ag-grid-community";
import FormGroup from "../components/Form";

const Home = () => {
  const [colDefs, setColDefs] = useState<ColDef<IFakeApiData>[]>(
    [] as ColDef<IFakeApiData>[]
  );
  const [addEntries, setAddEntries] = useState(false);
  const [formData, setFormData] = useState<IFakeApiData>({} as IFakeApiData);

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

  const { data, handleEditData } = useGetFakeApiData();

  const parseDataforGrid = () => {
    if (data.length) {
      const dataItem = data[0];
      const keys = Object.entries(dataItem).map(([key]) => ({
        field: key,
      }));

      let formDataKeys = {} as IFakeApiData;
      for (const [key] of Object.entries(dataItem)) {
        formDataKeys = {
          ...formDataKeys,
          [key]: "",
        };
      }
      setColDefs(keys as [] as ColDef<IFakeApiData>[]);
      setFormData(formDataKeys);
    }
  };

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  useEffect(() => {
    parseDataforGrid();
    return () => {
      setColDefs([] as ColDef<IFakeApiData>[]);
    };
  }, [data]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = () => {
    handleEditData([...data, formData]);
  };

  const rows = Object.entries(formData).map(([key, value]) => {
    return {
      name: key,
      value: value,
      onChange: handleChange,
      label: key,
      controlId: key,
      placeholder: key,
      type: "string",
    };
  });
  // city, sales_rep, state, website, zipcode

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

      {addEntries && (
        <>
          <FormGroup rows={rows} />
          <Button onClick={onSubmit}>Submit</Button>
        </>
      )}

      <Button onClick={() => setAddEntries(true)}>Add entries</Button>
      <Button onClick={() => setAddEntries(false)}>Cancel</Button>
    </Container>
  );
};

export default Home;
