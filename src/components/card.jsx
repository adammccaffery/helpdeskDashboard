import React from "react";

function Card(props) {
    const GetDynamicClass = () => {
    var classList = "";
    var warningL = 30


    switch(props.category){
        case 'Helpdesk':
            warningL = 40
            break
        case "Database":
            warningL = 40
            break
        case "IT Ops":
            warningL = 12
            break
        default:
            warningL = 40
            break
    }

        var tix = props.value
            switch (props.name){
                case "Action Required":
                    switch (true){
                        case (tix >= warningL):
                            classList = "warningImportant";
                            break;
                        case (tix >= warningL/1.5):
                            classList = "warningCaution";
                            break;
                        default:
                            break;
                    }
                    break
                case "Unassigned":
                    switch (true){
                        case (tix >= warningL/4):
                            classList = "warningImportant";
                            break;
                        case (tix >= 0):
                            classList = "warningCaution";
                            break;
                        default:
                            break;
                    }
                    break
                case "Incident Action Required":
                    switch (true){
                        case (tix >= warningL/4):
                            classList = "warningImportant";
                            break;
                        case (tix >= warningL/8):
                            classList = "warningCaution";
                            break;
                        default:
                            break;
                    }
                    break
                case "Service Request":
                    switch (true){
                        case (tix >= warningL/4):
                            classList = "warningImportant";
                            break;
                        case (tix >= warningL/8):
                            classList = "warningCaution";
                            break;
                        default:
                            break;
                    }
                    break
                    /*
                case "Resolved Today":
                    switch (true){
                        case (tix >= 10):
                            classList = "warningImportant";
                            break;
                        case (tix >= 5):
                            classList = "warningCaution";
                            break;
                        default:
                            break;
                    }
                    */
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
