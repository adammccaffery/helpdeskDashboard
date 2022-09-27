import React from "react";

function Card(props) {
    const GetDynamicClass = () => {
        if (props.category === "Agents") {
            return props.category
        }
    var classList = "";
    var warningL = 30


    switch(props.category){
        case 'Helpdesk':
            warningL = 50
            break
        case "Database":
            warningL = 40
            break
        case "IT Ops":
        case "AV":
            warningL = 12
            break
        default:
            warningL = 40
            break
    }

        var tix = props.value
            switch (props.name){
                case "Action Required":
                case "IT Ops Action Required / Unassigned":
                    switch (true){
                        case (tix >= warningL):
                            classList = "warningImportant";
                            break;
                        case (tix >= warningL/1.3):
                            classList = "warningCaution";
                            break;
                        case (tix >= warningL/1.5):
                            classList = "warningSome";
                            break;
                        default:
                            classList = "warningNone"
                            break;
                    }
                    break
                case "Unassigned":
                    switch (true){
                        case (tix >= warningL/4):
                            classList = "warningImportant";
                            break;
                        case (tix > warningL/5):
                            classList = "warningCaution";
                            break;
                        case (tix > 0):
                            classList = "warningSome";
                            break;
                        default:
                            classList = "warningNone"
                            break;
                    }
                    break
                case "Incident":
                    switch (true){
                        case (tix >= warningL):
                            classList = "warningImportant";
                            break;
                        case (tix >= warningL/1.3):
                            classList = "warningCaution";
                            break;
                        case (tix >= warningL/1.6):
                            classList = "warningSome";
                            break;
                        default:
                            classList = "warningNone"
                            break;
                    }
                    break
                case "Service Request":
                    switch (true){
                        case (tix >= warningL/3):
                            classList = "warningImportant";
                            break;
                        case (tix >= warningL/5):
                            classList = "warningCaution";
                            break;
                        case (tix >= warningL/8):
                            classList = "warningSome";
                            break;
                        default:
                            classList = "warningNone"
                            break;
                    }
                    break
                case "Resolved Today":
                    switch (true){
                        case (tix === 0):
                            break;
                        case (props.openedTickets - tix <= 0):
                            classList = "warningNone";
                            break;
                        case (props.openedTickets - tix >= 5):
                            classList = "warningImportant";
                            break;
                        case (props.openedTickets - tix >= 3):
                            classList = "warningCaution";
                            break;
                        case (props.openedTickets - tix > 0):
                            classList = "warningSome";
                            break;
                        default:
                            break;
                    }
                    break
            }


    return classList;
  };

  return (
    <div key={props.name + props.value} className={"card " + GetDynamicClass()}>
      <h2>{props.name}</h2>
      <div className="valueContainer">
        <p>{props.value}</p>
      </div>
    </div>
  );
}

export default Card;
