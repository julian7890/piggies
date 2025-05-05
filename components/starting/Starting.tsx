import React from "react";

export default function Starting() {
  type Player = {
    player: {
      name: string;
      position: string;
      order: number;
      number: number;
    };
  };

  const lineup = [
    { name: "Julian", position: "Pitcher", order: 1, number: 11 },
    { name: "Albert", position: "Catcher", order: 2, number: 12 },
  ];

  lineup.sort((a, b) => a.order - b.order);

  const PlayerCard = ({ player }: Player) => {
    return (
      <div className="grid grid-cols-4 text-xl">
        <div className="flex justify-center">{player.order}</div>
        <div>{player.name}</div>
        <div>{player.number}</div>
        <div>{player.position}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-w-max">
      <div>
        <div className="text-2xl bg-[#39737C] p-2 flex justify-center">
          Starting Lineup
        </div>
        <div className="grid grid-cols-4 text-[#7788a2]">
          <div className="flex justify-center">Batting</div>
          <div>Name</div>
          <div>#</div>
          <div>Position</div>
        </div>
        {lineup.map((player) => {
          return <PlayerCard key={player.order} player={player} />;
        })}
      </div>
    </div>
  );
}
