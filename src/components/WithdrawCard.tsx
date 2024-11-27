import React, { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { getPoolContract } from '../contracts/IDOPool';
import ERC20, { getERC20Token } from '../contracts/ERC20';

import '../styles/components/withdraw-card.scss';

interface WithdrawCardProps {
  address: string; // pool contract address
  buyTokenAddress: string; // buy token contract address
  buyTokenSymbol: string; // buy token symbol
  isSuccessed: boolean;
}

export default function WithdrawCard(props: WithdrawCardProps) {
  const [withdrawAmount, setWithdrawAmount] = useState<bigint>(BigInt(0));

  const handleClickWithdraw = async () => {
    if (!props.isSuccessed) {
      alert('Cannot refund because the pool is not successed');
      return;
    }

    const poolContract = await getPoolContract(props.address);
    if (!!poolContract) {
      const buyToken = await getERC20Token(props.buyTokenAddress);
      if (buyToken !== undefined) {
        const tx1 = await buyToken.approve(props.address, ethers.parseEther(withdrawAmount.toString()));
        await tx1.wait();

        const tx2 = await poolContract.withdraw().catch((error) => {
          alert('Error staking:' + error.message);
        });
        await tx2.wait();

        alert('Successfully withdrawed');
      }
    }
  };

  const getWithdrawableAmount = async () => {
    const poolContract = await getPoolContract(props.address);

    if (!!poolContract) {
      const withdrawableAmount = await poolContract.getTotalStakedAmount();
      setWithdrawAmount(withdrawableAmount);
    } else {
      setWithdrawAmount(BigInt(0));
    }
  };

  useEffect(() => {
    if (props.address.length !== 0) {
      getWithdrawableAmount();
    }
  }, [props.address]);

  return (
    <div className="participate-card">
      <div className="card-header">
        <h3>Withdraw</h3>
      </div>
      <div className="card-content">
        <div className="content-item">
          <label className="title">Withdraw</label>
          <label className={`info ${props.isSuccessed ? 'success' : 'fail'}`}>
            You can withdraw {ethers.formatEther(withdrawAmount)} {props.buyTokenSymbol}.{' '}
            {props.isSuccessed ? 'Project successed. Can withdraw' : "Project failed. Can't withdraw."}
          </label>
          <button onClick={handleClickWithdraw}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
