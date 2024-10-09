import React, { useState } from "react";
import "./DetailSection.css";
import { useDispatch, useSelector } from "react-redux";
import { addDetail, removeDetail } from "../../redux/actions";

const DetailSection = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const headerData = useSelector((state) => state.headerData);
  const details = useSelector((state) => state.detailData);

  const vrno = headerData.vr_no;
  const srNo = details.length + 1;

  const handleDetailSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.item_code ||
      !formData.item_name ||
      !formData.qty ||
      !formData.rate
    ) {
      alert("All fields are required!");
      return;
    }

    const newDetail = {
      id: new Date().getTime(),
      item_code: formData.item_code,
      item_name: formData.item_name,
      description: formData.description,
      qty: formData.qty,
      rate: formData.rate,
      amount: formData.qty * formData.rate,
    };

    dispatch(addDetail(newDetail));

    const newFormDetails = {
      vr_no: vrno || 67,
      sr_no: srNo,
      item_code: formData.item_code,
      item_name: formData.item_name,
      description: formData.description,
      qty: formData.qty,
      rate: formData.rate,
    };

    if (newFormDetails.length === 0) {
      alert("Please fill out all Detail Section fields.");
      return;
    }

    try {
      const res = await fetch("http://5.189.180.8:8010/detail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFormDetails),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Successfully saved in database.");
      }
    } catch (error) {
      alert("Failed: ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleDetailSubmit}>
        <div className="detail-form">
          <h2>Detail Section</h2>

          <div className="input-section">
            <input
              required
              placeholder="Item Code"
              type="text"
              id="item_code"
              value={formData.item_code}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            />

            <input
              required
              placeholder="Item Name"
              type="text"
              value={formData.item_name}
              id="item_name"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            />
          </div>

          <textarea
            required
            rows={"3"}
            id="description"
            placeholder="Description"
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
          ></textarea>

          <div className="input-section">
            <input
              required
              placeholder="Quantity"
              type="number"
              value={formData.qty}
              id="qty"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            />

            <input
              required
              placeholder="Rate"
              type="number"
              value={formData.rate}
              id="rate"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            />

            <input
              // required
              placeholder="Amount"
              type="number"
              value={formData.qty * formData.rate}
              id="amount"
              disabled
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            />
          </div>

          <button type="submit">Add Detail</button>
        </div>
      </form>

      <div>
        <h3>Added Details</h3>

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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {details.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{vrno && vrno}</td>
                <td>{item.description}</td>
                <td>{item.qty}</td>
                <td>{item.rate}</td>
                <td>{item.amount}</td>
                <td>
                  <button
                    className="rmv-btn"
                    onClick={() => dispatch(removeDetail(item.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tbody>
            <tr>
              <td>{srNo}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="sub-btn">
          <div className="amt-area">
            <h4>Total Amount: </h4>
            <span className="amt">
              {details
                ?.map((item) => item.amount)
                ?.reduce((accumulator, element, index, array) => {
                  return accumulator + element;
                }, 0)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSection;
