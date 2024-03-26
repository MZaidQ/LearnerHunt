import React, { Component } from 'react'
import Classes from "/styles/gernal.module.css";
const currentYear = new Date().getFullYear()

export default class YearList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startYear: 1800,
            endYear: currentYear,
        }
    }
    generateYears = () => {
        const years = [];
        for (let year = this.state.endYear; year >= this.state.startYear; year--) {
            years.push(year);
        }
        return years;
    };
    render() {
        return (
            <div className={Classes["form-group"]}>
                <label className={Classes["labelname"]} htmlFor="name">
                    {this.props.label} {this.props.required && <span className={Classes["error"]}>*</span>}
                </label>
                <select
                    required={this.props.required}
                    id="yearSelect"
                    value={this.props.selectedYear}
                    disabled={this.props.disabled}
                    className="form-select"
                    onChange={(e) => this.props.onChange(e.target.value)}
                >
                    <option value="" disabled>Select a year</option>
                    {this.generateYears().map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}
