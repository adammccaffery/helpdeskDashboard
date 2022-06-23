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
                {props.name === "Resolved Today" && props.top5.map(function (c,i) {
                    return (
                        <>
                            <tr>
                                <td>{c.name}</td>
                                <td>{c.resolvedTickets}</td>
                            </tr>
                        </>
                    );
                })}
                {props.name === "Open Tickets" && props.top5.map(function (c,i) {
                    return (
                        <>
                            <tr>
                                <td>{c.name}</td>
                                <td>{c.openedTickets}</td>
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
