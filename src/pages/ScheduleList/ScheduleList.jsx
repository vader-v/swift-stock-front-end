// css
import styles from './ScheduleList.module.css'

function ScheduleList({ schedules }) {
  return (
    <div className={styles.container}>
    <ul>
      {schedules.map((schedule) => (
        <li key={schedule._id}>
          <p>Start Date: {schedule.startDate}</p>
          <p>End Date: {schedule.endDate}</p>
          <p>Custom Labels: {schedule.customLabels.join(', ')}</p>
          <p>Order Receipts:</p>
          <ul>
            {schedule.orderReceipts.map((receipt) => (
              <li key={receipt._id}>
                <p>Label: {receipt.label}</p>
                <p>Value: {receipt.value}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
      </div>
  );
}

export default ScheduleList