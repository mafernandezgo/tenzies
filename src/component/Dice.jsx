export default function Die (props) {
    return (
        <div className={`dice ${props.isHeld? "selected" : "" }`} data-held={props.isHeld ? "si" : "no"} onClick={props.holdDice}>
            <h1 className={`diceConf clase${props.value}`}>{props.value}</h1>
        </div>
    )


}