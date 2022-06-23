import React from "react";

function LeaderboardCard(props) {
    const GetDynamicClass = () => {
        var classList = ""
        return classList
    }
    

  return (
    <div key={props.name + props.value} className={"card leaderboard" + GetDynamicClass()}>
      <h2>{props.name}</h2>
      <div className="leaderboardValueContainer">
            <table>
                {props.top5 !== null && props.top5.map(function (c,i) {
                    return (
                        <>
                            <tr>
                                <td>{c.name}</td>
                                <td>{c.resolvedTickets}</td>
                            </tr>
                        </>
                    );
                })}
            </table>
      </div>
    </div>
  );
}

export default LeaderboardCard;
