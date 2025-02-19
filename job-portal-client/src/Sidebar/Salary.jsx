import React from 'react';
import Button from './Button';
//import Location from './Location';
import InputField from '../components/InputField';
// Ensure InputField is correctly imported

function Salary({ handleChange, handleClick }) {
  return (
    <div>
      <h4 className="text-lg font-medium mb-1">Salary</h4>
      <div className="mb-4">
        <Button onClickHandler={handleClick} value="hourly" title="Hourly" />
        <Button onClickHandler={handleClick} value="monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="yearly" title="Yearly" />
      </div>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="salaryOption"
            id="allOption"
            value="all"
            onChange={handleChange}
          />
          <span className="checkmark"></span>
          All
        </label>

        <InputField
          handleChange={handleChange}
          value="30"
          title="< 30k"
          name="salaryInput"
        />
        <InputField
          handleChange={handleChange}
          value="50"
          title="< 50k"
          name="salaryInput"
        />
        <InputField
          handleChange={handleChange}
          value="80"
          title="< 80k"
          name="salaryInput"
        />
        <InputField
          handleChange={handleChange}
          value="100"
          title="< 100k"
          name="salaryInput"
        />
      </div>
    </div>
  );
}

export default Salary;
