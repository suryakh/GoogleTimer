import React from "react"
import Display from "./Display";

class Stop_watch extends React.Component {
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
    componentDidMount() {
        console.log(this.props.resetbtn, "ddddd")
        this.setState({
            timer: this.props.datasend
        })
        this.x = setInterval(() => {
            let temp = this.state.timer
            temp.msec_count = this.state.timer.msec_count + 1
            this.setState({
                timer: temp
            })
            console.log(this.state.timer.sec_count)
            if (this.state.timer.msec_count > 99) {
                temp.msec_count = 0
                temp.sec_count = this.state.timer.sec_count + 1
                this.setState({
                    timer: temp
                })
            }
            if (this.state.timer.sec_count > 59) {
                temp.sec_count = 0
                temp.min_count = this.state.timer.min_count + 1
                this.setState({
                    timer: temp
                })
            }
            if (this.state.timer.min_count > 59) {
                temp.min_count = 0
                temp.hr_count = this.state.timer.hr_count + 1
                this.setState({
                    timer: temp
                })
            }
        }, 10);
        if (this.props.start == true) {
            this.props.btn(true)
        }
    }
    componentWillUnmount() {
        clearInterval(this.x)
        this.props.datastop(this.state.timer)
        this.props.btn(false)
    }
    render() {
        return (
            <div className="container">
                <div className="col-12">
                    {!this.props.start && <Display data={this.state.timer} />}
                    <h1>{this.state.timer.hr_count}<small>h : </small>{this.state.timer.min_count}<small>m : </small>{this.state.timer.sec_count}<small>sec : </small>{this.state.timer.msec_count}<small>ms</small></h1>

                </div>
            </div>
        )
    }
}
export default Stop_watch