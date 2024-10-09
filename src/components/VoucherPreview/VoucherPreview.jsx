import React from "react";
import "./VoucherPreview.css";
import { useSelector } from "react-redux";

const VoucherPreview = () => {
  const headerData = useSelector((state) => state.headerData);
  const detailData = useSelector((state) => state.detailData);

  const vrno = headerData.vr_no;

  return (
    <div className="voucher">
      <h1>Voucher Preview</h1>

      <div className="header-voucher">
        <p className="title">Header</p>

        <div className="items">
          <p>
            Vr No: <span>{headerData.vr_no}</span>
          </p>

          <p>
            Vr Date: <span>{headerData.vr_date}</span>
          </p>
          <p>
            Status: <span>{headerData.status}</span>
          </p>
          <p>
            Ac Name: <span>{headerData.ac_name}</span>
          </p>
          <p>
            Ac Amt: <span>{headerData.ac_amt}</span>
          </p>
        </div>
      </div>

      <p className="title">Details</p>

      <table border="1">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Vr NO</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {detailData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{vrno && vrno}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>{item.rate}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.print()}>Print Voucher</button>
    </div>
  );
};

export default VoucherPreview;
