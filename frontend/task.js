import React from "react";
import {
  useBase,
  useRecords,
  CellRenderer,
  Box,
  initializeBlock,
} from "@airtable/blocks/ui";

const TABLE_NAME = "Design projects";
const Task = () => {
  const base = useBase();

  const table = base.getTableByNameIfExists(TABLE_NAME);

  const queryResult = table.selectRecords();

  //getting all record from the table
  const records = useRecords(queryResult);

  const data = records.map((record) => {
    return <SigleRecord record={record} table={table} />;
  });
  return (
    <>
      <div>{data}</div>
    </>
  );
};

const SigleRecord = ({ table, record }) => {
  //getting all Fields of the table
  const tableFields = table.fields;

  //Loop On Each Field Of the table
  const Data = tableFields.map((field) => {
    const getfield = table.getFieldByName(field.name);

    return (
      <>
        <Box padding={1}>
          <Box fontWeight={600}>{field.name}</Box>
          <Box paddingTop={"10px"}>
            <CellRenderer field={getfield} record={record} />
          </Box>
        </Box>
      </>
    );
  });

  return (
    <Box padding={3} borderBottom="thick">
      {Data}
    </Box>
  );
};

export default Task;
