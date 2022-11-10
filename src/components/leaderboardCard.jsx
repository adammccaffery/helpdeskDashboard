import React from "react";

function LeaderboardCard(props) {
    const GetDynamicClass = () => {
        var classList = ""
        return classList
    }
    

  return (
    <div key={props.name + props.value} className={"card leaderboard" + GetDynamicClass()}>
      <h2>{props.name}</h2>
                {props.name === "Resolved Today" && props.top5.map(function (c,i) {
                    return (
                        <div className="leaderboardValueContainer">
                            <table>
                                <tr>
                                    <td className="leaderboardLeftAlign">{c.name}</td>
                                    <td className="leaderboardRightAlign">{c.resolvedTickets}</td>
                                </tr>
                            </table>
                        </div>
                    );
                })}
                {props.name === "IT Ops" && props.top5.map(function (c,i) {
                    return (
                        <div className="leaderboardValueContainer">
                            <table>
                                <tr>
                                    <td className="leaderboardLeftAlign">{c.name}</td>
                                    <td className="leaderboardRightAlign">{c.value}</td>
                                </tr>
                            </table>
                        </div>
                    );
                })}
                {props.name === "Open Tickets" && props.top5.map(function (c,i) {
                    return (
                            <div className="leaderboardValueContainer">
                                <table>
                                    <tr>
                                        <td className="leaderboardLeftAlign">{c.name}</td>
                                        <td className="leaderboardRightAlign">{c.openedTickets}</td>
                                    </tr>
                                </table>
                            </div>
                    );
                })}
                {props.name === "Monthly Resolved" && props.top5.map(function (c,i) {
                    return (
                        <div className="leaderboardValueContainer">
                            <table>
                                <tr>
                                    <td className="leaderboardLeftAlign">{c.name}</td>
                                    <td className="leaderboardRightAlign">{c.resolvedThisMonth}</td>
                                </tr>
                                </table>
                            </div>
                    );
                })}
                {props.name === "Upcoming Events" && props.top5.map(function (c,i) {
                    return (
                      <div className="leaderboardFunctionValueContainer">
                            <table>
                                <tr>
                                    <td className="leaderboardLeftAlign">{c.subject}</td>
                                    <td className="leaderboardRightAlign">{c.dueDate}</td>
                                </tr>
                                </table>
                            </div>
                    );
                })}
    </div>
  );
}

export default LeaderboardCard;
