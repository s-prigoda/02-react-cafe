import { useState } from "react";
import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import type { Votes, VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalFeedback = votes.good + votes.neutral + votes.bad;

  const positiveRate =
    totalFeedback > 0 ? Math.round((votes.good / totalFeedback) * 100) : 0;

  const handleVote = (type: VoteType) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalFeedback > 0}
      />

      {totalFeedback > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalFeedback}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
