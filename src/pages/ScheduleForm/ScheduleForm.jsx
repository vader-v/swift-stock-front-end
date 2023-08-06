import { useState } from 'react';
import * as styles from './ScheduleForm.module.css';

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
    <form onSubmit={handleSubmit} className={styles.form}>

      <div className={styles.inputGroup}>
      <label htmlFor='startDate'>
        Start Date:
      </label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={styles.input} required/>
      </div>

      <div className={styles.inputGroup}>
      <label htmlFor="startTime">
        Start Time:
      </label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required/>
      </div>

      <div className={styles.inputGroup}>
      <label htmlFor="endDate">
        End Date:
      </label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
      </div>

      <div className={styles.inputGroup}>
      <label htmlFor="endTime">
        End Time:
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required/>
      </label>
      </div>

      <div className={styles.orderReceipts}>

      <label>
        Order Receipts:
        </label>
        {orderReceipts.map((receipt, index) => (
          <div key={index} className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Label"
              value={receipt.label}
              onChange={(e) => handleChangeLabel(index, 'label', e.target.value)}
              className={styles.input}
              required
              />
            <input
              type="text"
              placeholder="Value"
              value={receipt.value}
              onChange={(e) => handleChangeLabel(index, 'value', e.target.value)}
              className={styles.input}
              required
              />
            <button type="button" onClick={() => handleRemoveLabel(index)} className={styles.removeLabelBtn}>
              Remove Label
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddLabel} className={styles.addLabelBtn}>
          Add Label
        </button>

      </div>
      <br />
      <button type="submit" className={styles.submitBtn}>Submit</button>
    </form>
  );
}

export default ScheduleForm;
