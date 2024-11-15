import { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { IFakeApiData } from "types/models/fakeApi";
import { useGetFakeApiData, useDebounce } from "../hooks";
import Charts from "../components/Charts";
import { AgGridReact } from "ag-grid-react";
import { ColDef, FirstDataRenderedEvent } from "ag-grid-community";
import FormGroup from "../components/Form";

const Home = () => {
  const { data, handleEditData } = useGetFakeApiData();

  const [colDefs, setColDefs] = useState<ColDef<IFakeApiData>[]>(
    [] as ColDef<IFakeApiData>[]
  );
  const [addEntries, setAddEntries] = useState(false);
  const [formData, setFormData] = useState<IFakeApiData>({} as IFakeApiData);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const search = (query: string) => {
    const lowerSearch = String(query.toLowerCase());
    const filteredData = data.filter(
      (item) => item.city === lowerSearch.toLowerCase()
    );
    return filteredData;
  };
  const debouncedQuery = useDebounce(searchQuery as string, 1000);

  useEffect(() => {
    setDebouncedSearch(debouncedQuery);
    search(debouncedQuery);
  }, [debouncedQuery]);

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
    setSearchQuery(e.target.value);
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

  return (
    <Container>
      <Charts />
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

      <section style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
        <Button onClick={() => setAddEntries(true)}>Add entries</Button>
        <Button variant="secondary" onClick={() => setAddEntries(false)}>
          Cancel
        </Button>
      </section>
    </Container>
  );
};

export default Home;
