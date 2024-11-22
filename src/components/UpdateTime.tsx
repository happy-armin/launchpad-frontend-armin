import React, { useState } from 'react';
import DateTimePicker from './DateTimePicker';
import { Contract } from 'ethers';
import { getPoolContract } from '../contracts/IDOPool';
import { TimeStamps } from '../types/types';

import '../styles/components/update-time.scss';

interface UpdateTimeProps {
  address: string; // pool contract address
  startTime: Date;
  endTime: Date;
  claimTime: Date;
  setValue: (value: TimeStamps) => void;
}

export default function UpdateTime(props: UpdateTimeProps) {
  const [startDateTime, setStartDateTime] = useState<Date | null>(props.startTime);
  const [endDateTime, setEndDateTime] = useState<Date | null>(props.endTime);
  const [claimDateTime, setClaimDateTime] = useState<Date | null>(props.claimTime);

  // handle date change events from input fields
  const handleStartDateChange = (date: Date | null) => {
    setStartDateTime(date);
  };
  const handleEndDateChange = (date: Date | null) => {
    setEndDateTime(date);
  };
  const handleClaimDateChange = (date: Date | null) => {
    setClaimDateTime(date);
  };

  // handle update timestamps function
  const handleUpdateTime = async () => {
    const poolContract: Contract | undefined = await getPoolContract(props.address);

    if (poolContract !== undefined) {
      if (!!startDateTime && !!endDateTime && !!claimDateTime) {
        await poolContract
          .updateTimestamps([
            startDateTime.getTime() / 1000,
            endDateTime.getTime() / 1000,
            claimDateTime.getTime() / 1000,
          ])
          .then((data) => {
            props.setValue({
              startTimestamp: BigInt(startDateTime.getTime() / 1000),
              endTimestamp: BigInt(endDateTime.getTime() / 1000),
              claimTimestamp: BigInt(claimDateTime.getTime() / 1000),
            });
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  };

  return (
    <div className="update-time">
      <div className="card-header">
        <h3>Update Timestamps</h3>
        <button className="action-button" onClick={handleUpdateTime}>
          Confirm
        </button>
      </div>
      <div className="card-content">
        <div className="content-item">
          <label className="title">Start TimeStamp:</label>
          <DateTimePicker value={startDateTime} id="startStamp" onChange={handleStartDateChange} />
        </div>
        <div className="content-item">
          <label className="title">End TimeStamp:</label>
          <DateTimePicker value={endDateTime} id="startStamp" onChange={handleEndDateChange} />
        </div>
        <div className="content-item">
          <label className="title">Claim TimeStamp:</label>
          <DateTimePicker value={claimDateTime} id="startStamp" onChange={handleClaimDateChange} />
        </div>
      </div>
    </div>
  );
}
