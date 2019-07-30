import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Current.scss';

import Heading from '../Heading/Heading';
import BoxList from './elements/boxList';
import { loadData, addError } from '../../actions';
import { checkGeolocation, formatTimestamp, windDegreeToName, checkAvailableData } from '../../helpers';

class Current extends React.Component {

    componentDidMount() {
        if (Object.entries(this.props.weather).length === 0) {
            this.geoLocation();
        } else {
            if (this.props.weather.name !== this.props.city) {
                this.geoLocation(this.props.city);
            }
        }
    }

    geoLocation(city = false) {
        checkGeolocation(this.props.loadData, this.props.addError, 'current', city);
    }

    render() {
        let render = null;

        const { main, sys, weather, wind, name, updated, clouds } = this.props.weather;

        const availableData = checkAvailableData(this.props.error, this.props.weather);
        if (availableData) {
            render = availableData;
        }
        else {
            // sometimes wind object from response is empty
            let windDegree = null;
            if (wind.hasOwnProperty('deg')) {
                windDegree = windDegreeToName(wind.deg.toFixed(0));
            }
            // prepare data for boxList component
            const data = {
                wind: {
                    name: 'Wind',
                    value: [wind.speed + ' m/s', windDegree],
                    icon: 'fas fa-wind'
                },
                clouds: {
                    name: 'Clouds',
                    value: [weather[0].description, `${clouds.all}%`],
                    icon: 'fas fa-cloud'
                },
                humidity: {
                    name: 'Humidity',
                    value: [main.humidity + ' %'],
                    icon: 'fas fa-water'
                },
                pressure: {
                    name: 'Pressure',
                    value: [main.pressure + ' hpa'],
                    icon: 'fas fa-heartbeat'
                },
                sunrise: {
                    name: 'Sunrise',
                    value: [formatTimestamp(sys.sunrise, true)],
                    icon: 'far fa-sun'
                },
                sunset: {
                    name: 'Sunset',
                    value: [formatTimestamp(sys.sunset, true)],
                    icon: 'fas fa-sun'
                }
            };

            render = (
                <div className="current">
                    <div className="col-1-of-3">
                        <Heading
                            type="current"
                            cityName={name}
                            country={sys.country}
                            updated={updated}
                        />
                    </div>
                    <div className="col-2-of-3">
                        <BoxList data={data} />
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                {render}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { weather: state.current, city: state.city, error: state.errors };
}

export default connect(mapStateToProps, {
    loadData,
    addError
})(Current);

Current.propTypes = {
    weather: PropTypes.object,
    loadData: PropTypes.func,
    city: PropTypes.string,
    addError: PropTypes.func,
    error: PropTypes.object
}