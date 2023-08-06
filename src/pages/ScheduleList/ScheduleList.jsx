// css
import styles from './ScheduleList.module.css'

function ScheduleList({ schedules }) {
  if (!schedules.length) {
    return <p>Loading schedules...</p>; // You can render a loading state or any appropriate message here
  }

  if (schedules.length === 0) {
    return <p>No schedules available</p>;
  }

  return (
    <div className={styles.container}>
        <ul className={styles.scheduleGrid}>
          {schedules.map((schedule) => (
            <li key={schedule._id} className={styles.scheduleListElements}>
              <p>Start Date: {schedule.startDate}</p>
              <p>End Date: {schedule.endDate}</p>
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

export default ScheduleList;