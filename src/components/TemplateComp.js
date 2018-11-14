import React, { Component } from 'react';
// Import axios to use an API:
import axios from 'axios';

// to use an API key in the .env file:
const apiKey = process.env.REACT_APP_API_KEY;

// For the current Date:
let currentDate = new Date().toISOString().slice(0, 10);

// For the Url parts of an API
const startURL = '';
const nextPartUrl = '';
const anotherPartUrl = '';

class TemplateComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: 'Something',
            startDate: '2010-01-01',
            isLoading: false,
            error: null,
            data: {
                // data = for use of react-chartjs-2
                labels: [],
                datasets: [
                    {
                        someKey: 'someValue',
                        someData: []
                    }
                ]
            }
        };
    }

    handleInputChange(stateFieldName, event) {
        this.setState({
            [stateFieldName]: event.target.value
        });
    }
    // Onclick get the data and set the state to visualize at render:
    async handleClick(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        try {
            let Url =
                startURL +
                nextPartUrl +
                anotherPartUrl +
                this.state.ticker +
                this.state.startDate +
                currentDate +
                apiKey;

            // To get the data from the API url call with axios:
            const result = await axios.get(Url);

            // in the JSON object find the data you need to visualize:
            let dataset = result.data.dataset.someData; //example

            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false, error });
        }
    }

    render() {
        const { error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        return (
            <div>
                <div className="header">
                    <h1>VISUALIZE SOMETHING</h1>
                </div>
                <div className="content">
                    <div id="form-container">
                        <form>
                            1. Type in SOMETHING
                            <br />
                            <input
                                type="text"
                                value={this.state.ticker}
                                onChange={e => this.handleInputChange('ticker', e)}
                            />{' '}
                            <br />
                            2. Select start date
                            <br />
                            <input
                                type="date"
                                value={this.state.startDate}
                                onChange={e => this.handleInputChange('startDate', e)}
                            />{' '}
                            <button onClick={e => this.handleClick(e)}>PRESS BUTTON</button>
                            <br />
                            <div className="mdd">
                                Visualize something :{/*this.state.something*/} <br />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TemplateComp;
