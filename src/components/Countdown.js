import React from "react"

class Countdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: { sec: 0, min: 0, hr: 0 },
            count: 0,
            display: ""
        }
    }
    componentDidMount() {
        this.setState({
            data: this.props.dataIn
        })
        this.x = setInterval(() => {
            let temp = this.state.data
            if (this.props.dataIn.sec == 0 && this.props.dataIn.min != 0) {
                temp.sec = 60
                temp.min = temp.min - 1
            }
            else {
                temp.sec = this.props.dataIn.sec
            }
            temp.sec = temp.sec - 1
            this.setState({
                data: temp
            })


            if (this.state.data.sec == 0 && this.state.data.min != 0) {
                console.log("s=0 mi != 0")
                temp.sec = 59
                temp.min = this.state.data.min - 1
                this.setState({
                    data: temp
                })

            }
            else if (this.state.data.sec == 0 && this.state.data.min == 0) {

                clearInterval(this.x)
                this.setState({
                    display: "Time Out"
                })
            }
            else if (this.state.data.min == 0 && this.state.data.hr != 0) {
                console.log("m=0 hr != 0")
                if (this.state.data.sec == -1) {
                    // console.log(this.state.data.sec)
                    temp.sec = 59
                }

                temp.min = 59
                temp.hr = this.state.data.hr - 1
                this.setState({
                    data: temp
                })
            }
            else if (this.state.data.min == 0 && this.state.data.hr != 0 && this.state.data.sec == 0) {
                console.log("s=0 mi = 0 hr !=0")
                temp.sec = 59
                temp.min = 59
                temp.hr = this.state.data.hr - 1
                this.setState({
                    data: temp
                })
            }
            else if (this.state.data.min == 0 && this.state.data.hr == 0 && this.state.data.sec == 0) {
                clearInterval(this.x)
                this.setState({
                    display: "Time Out"
                })

            }
            if (this.props.countReset == false) {
                clearInterval(this.x)
                let temp = {
                    sec: 0, min: 0, hr: 0
                }
                this.setState({
                    data: temp
                })
                this.props.dataOut(this.state.data)
            }
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.x)
        this.props.dataOut(this.state.data)
        this.props.labelshows(true)
    }
    render() {
        return (
            <div className="container my-5">
                <div className="p-5">
                    <h1 style={{ color: "green" }}>
                        {this.state.data.hr} <small>h</small>: {this.state.data.min} <small>min</small>: {this.state.data.sec}<small>sec</small>
                    </h1>
                    <div style={{ color: "red" }}><h1>{this.state.display}</h1></div>
                </div>
            </div>
        )
    }
}
export default Countdown