import React from "react";
import { Table, Form, Row } from "react-bootstrap";
import "./index.css";

export class DataTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tempDataId: 0,
      value: null
    };
  }
  setTempDataName(value) {
    this.setState({ tempDataName: value });
  }
  setTempDataId(value) {
    this.setState({ tempDataId: value });
  }

  checkAlreadyExists(DataId) {
    if (
      this.state.data.find(
        dt =>
          dt.name.toLowerCase() === this.state.tempDataName.toLowerCase() &&
          dt.id !== DataId
      )
    ) {
      this.props.enqueueSnackbar(
        `${this.state.tempDataName} adlı müşteri listede zaten var!`,
        {
          variant: "error",
          autoHideDuration: 3000
        }
      );
      return true;
    }
    return false;
  }

  checkAndSetTempData(value) {
    if (value.length > 40) {
      this.props.enqueueSnackbar(`Müşteri adı 40 karakterden büyük olamaz!`, {
        variant: "warning",
        autoHideDuration: 3000
      });
    } else {
      this.setTempDataName(value);
    }
  }

  render() {
    let { columns, dbColumns, data, tableName, join } = this.props;
    const renderColumns = (dt, dbCol) => {
      if (dt && dbCol) {
        switch (dbCol) {
          case "date":
            return new Date(dt[dbCol]).toLocaleDateString("tr-TR");
          case "playerCount":
            return `${dt[dbCol]}/2`;
          default:
            return dt[dbCol];
        }
      }
    };
    return (
      <div className="table-container">
        <h6 className="table-title bold">{tableName}</h6>
        <Table striped bordered hover responsive size="sm">
          <thead className="table-header">
            <tr>
              <th className="table-header-title bold">#</th>
              {columns.map((col, i) => (
                <th className="table-header-title bold" key={i}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((dt, i) => {
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      join(dt.ownerUuid);
                    }}
                  >
                    <td className="table-cell">{i + 1}</td>
                    {dbColumns.map((dbCol, dbI) => (
                      <td key={dbI} className="checkSquare table-cell">
                        <div className="checkBox medium">
                          {renderColumns(dt, dbCol)}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default DataTable;
