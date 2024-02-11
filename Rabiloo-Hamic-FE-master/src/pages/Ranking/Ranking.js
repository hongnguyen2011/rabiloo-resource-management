import RankingList from "./items/RankingList";
import "./ranking.css";

export default function Ranking() {
  return (
    <div className="rankingBody">
      <h2>Ranking</h2>
      <div className="tableTitle">
        <div>Top</div>
        <div>Name</div>
        <div>Score</div>
      </div>
      <div className="tableContent">
        <RankingList />
      </div>
    </div>
  );
}
