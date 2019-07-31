import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './FiveDay.scss';

import { loadData, addError } from '../../actions';
import { checkGeolocation, checkAvailableData, kelvinToCelcius } from '../../helpers';
import Heading from '../Heading/Heading';
import ListBox from './elements/listBox';
import TempGraph from './elements/tempGraph';
import RainGraph from './elements/rainGraph';


class FiveDay extends React.Component {

    componentDidMount() {
        if (Object.entries(this.props.fiveday).length === 0) {
            this.geoLocation();
        } else {
            if (this.props.fiveday.city.name !== this.props.city) {
                this.geoLocation();
            }
        }
    }

    geoLocation() {
        checkGeolocation(this.props.loadData, this.props.addError, 'fiveday', this.props.city);
    }

    prepareListData(data) {
        const dateList = {};
        data.forEach(el => {
            const element_date = new Date(el.dt * 1000);
            const new_date = element_date.toLocaleDateString('en-GB', { weekday: "long", day: "2-digit", month: "short", year: "numeric" }).replace(/\u200E/g, '');
            dateList[new_date] = [];
        })

        for (const element in dateList) {
            const arr = element.split(' ');
            const day = parseInt(arr[1]);
            data.forEach(item => {
                const date = new Date(item.dt * 1000);
                const item_day = date.getDate();
                if (day === item_day) {
                    dateList[element].push(item);
                }
            })
        }

        const listData = Object.entries(dateList).map((element, index) => {
            const list = element[1].map(({ dt_txt, weather, wind, main }) => {
                const time = dt_txt.substr(-8, 5);
                const icon = weather[weather.length - 1].icon;
                const desc = weather[weather.length - 1].description;
                const speed = wind.speed;
                const temp = main.temp;
                const humidity = main.humidity;
                const pressure = main.pressure;
                const data = { time, icon, desc, speed, temp, humidity, pressure };
                return data;
            })
            return <ListBox key={index} name={element[0]} data={list} />;
        })

        return listData;
    }

    prepareGraphData(data) {
        const tempData = [];
        const rainData = [];
        data.forEach(element => {
            const date = new Date(element.dt_txt.split(' ')[0]);
            const time = date.getTime();
            const obj = { date: time, value: 0 };
            if (!rainData.find(e => e.date === time)) {
                rainData.push(obj);
            }
            // rain object is also sometimes empty <.<
            if (element.rain && element.rain["3h"]) {
                rainData.forEach(el => {
                    if (el.date === time) {
                        el.value += element.rain["3h"];
                    }
                })
            }
            tempData.push({ date: new Date(element.dt * 1000), value: kelvinToCelcius(element.main.temp) })
        })
        return { tempData, rainData };
    }

    render() {
        let render = null;
        const { fiveday, error } = this.props;
        const availableData = checkAvailableData(error, fiveday);
        if (availableData) {
            render = availableData;
        }
        else {
            const { name, country } = fiveday.city;
            const { updated, list } = fiveday;

            const listData = this.prepareListData(list);
            const graphsData = this.prepareGraphData(list);
            render = (
                <div className="fiveday">
                    <div className="col-1-of-2">
                        <Heading
                            type="fiveday"
                            cityName={name}
                            country={country}
                            updated={updated}
                        />
                        <TempGraph data={graphsData.tempData} />
                        <RainGraph data={graphsData.rainData} />
                    </div>
                    <div className="col-1-of-2">
                        <div className="fiveday__list">
                            {listData}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="row" >
                {render}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { fiveday: state.fiveday, city: state.city, error: state.errors };
}

export default connect(mapStateToProps, {
    loadData,
    addError
})(FiveDay);

FiveDay.propTypes = {
    addError: PropTypes.func,
    loadData: PropTypes.func,
    fiveday: PropTypes.object,
    city: PropTypes.string,
    error: PropTypes.object
}