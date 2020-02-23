import React from "react"

class Display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timer: {
                msec_count: 0,
                sec_count: 0,
                min_count: 0,
                hr_count: 0
            }
        }
    }

    render() {
        return (
            <div>
                {this.props.start || this.props.reset ?
                    (<div><h1>{this.props.valuesfrom.hr_count}<small>h : </small>{this.props.valuesfrom.min_count}<small>m :</small>{this.props.valuesfrom.sec_count}<small>sec :</small>{this.props.valuesfrom.msec_count}<small>ms</small></h1></div>) : (<div><h1>{this.state.timer.hr_count}<small>h : </small>{this.state.timer.min_count}<small>m :</small>{this.state.timer.sec_count}<small>sec : </small> {this.state.timer.msec_count}<small>ms</small></h1></div>)}

            </div>
        )
    }
}
export default Display