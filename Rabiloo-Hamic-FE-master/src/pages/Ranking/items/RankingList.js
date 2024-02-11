function RankingListItem(props) {
  const { top, name, score } = props;
  return (
    <div>
      <div>{top}</div>
      <div>{name}</div>
      <div>{score}</div>
    </div>
  );
}
export default function RankingList() {
  const ranking = [
    {
      top: 1,
      name: "Data",
      score: 81388,
    },
    {
      top: 2,
      name: "Vg",
      score: 81388,
    },
    {
      top: 3,
      name: "Ad",
      score: 81388,
    },
    {
      top: 4,
      name: "Data",
      score: 81388,
    },
    {
      top: 5,
      name: "Data",
      score: 81388,
    },
    {
      top: 6,
      name: "Data",
      score: 81388,
    },
    {
      top: 7,
      name: "Data",
      score: 81388,
    },
    {
      top: 8,
      name: "Data",
      score: 81388,
    },
    {
      top: 9,
      name: "Data",
      score: 81388,
    },
    {
      top: 10,
      name: "Data",
      score: 81388,
    },
    {
      top: 11,
      name: "Data",
      score: 81388,
    },
  ];
  return ranking.map((ranking) => {
    return (
      <RankingListItem
        top={ranking.top}
        name={ranking.name}
        score={ranking.score}
      />
    );
  });
}
