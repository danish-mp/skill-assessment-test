import React, { useState } from "react";
import "./HeaderSection.css";
import { useDispatch } from "react-redux";
import { setHeaderData } from "../../redux/actions";

const HeaderSection = () => {
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.vr_no ||
      !formData.vr_date ||
      !formData.status ||
      !formData.ac_name ||
      !formData.ac_amt
    ) {
      return alert("Please fill out all fields.");
    }

    try {
      const res = await fetch("http://5.189.180.8:8010/header", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      dispatch(setHeaderData(formData));

      if (res.ok) {
        alert("Congratulations");
        console.log(formData);
      }
    } catch (error) {
      alert("Failed: ", error.message);
    }
  };

  return (
    <form onSubmit={handleHeaderSubmit} className="header-form">
      <p className="title">Header</p>

      <div className="multi-fields">
        <div className="inp-label">
          <label>Vr NO:</label>
          <input
            required
            type="number"
            name="vr_no"
            value={formData.vr_no}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="inp-label">
          <label>Vr Date:</label>
          <input
            required
            type="date"
            className="date-inp"
            value={formData.vr_date}
            name="vr_date"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="inp-label">
          <label>Status</label>
          <select
            required
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
      </div>

      <div className="multi-fields">
        <div className="inp-label">
          <label>Ac Name:</label>
          <input
            required
            type="text"
            value={formData.ac_name}
            name="ac_name"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="inp-label">
          <label>Ac Amt:</label>
          <input
            required
            type="number"
            value={formData.ac_amt}
            name="ac_amt"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
      </div>

      <button type="submit">Save Header</button>
    </form>
  );
};

export default HeaderSection;
