import { useState } from 'react';

function ScheduleForm({ onScheduleSubmit, updateScheduleList }) {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [orderReceipts, setOrderReceipts] = useState([{ label: '', value: '' }]);

  const handleAddLabel = () => {
    setOrderReceipts([...orderReceipts, { label: '', value: '' }]);
  };

  const handleRemoveLabel = (index) => {
    const updatedOrderReceipts = [...orderReceipts];
    updatedOrderReceipts.splice(index, 1);
    setOrderReceipts(updatedOrderReceipts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      startDate: `${startDate}T${startTime}`,
      endDate: `${endDate}T${endTime}`,
      orderReceipts,
    };

    try {
      const newSchedule = await onScheduleSubmit(data); // Call the onScheduleSubmit function to send the POST request
      console.log('New schedule Submitted:', newSchedule);
      updateScheduleList();
    } catch (error) {
      console.error('Error creating schedule:', error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  const handleChangeLabel = (index, field, value) => {
    const updatedOrderReceipts = [...orderReceipts];
    updatedOrderReceipts[index][field] = value;
    setOrderReceipts(updatedOrderReceipts);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        Start Time:
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <br />
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        End Time:
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <br />
      <label>
        Order Receipts:
        {orderReceipts.map((receipt, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Label"
              value={receipt.label}
              onChange={(e) => handleChangeLabel(index, 'label', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={receipt.value}
              onChange={(e) => handleChangeLabel(index, 'value', e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveLabel(index)}>
              Remove Label
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddLabel}>
          Add Label
        </button>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ScheduleForm;
