import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Heading.scss';

import Iconbox from './elements/iconbox';
import Basic from './elements/basic';
import RefreshButton from './elements/refreshButton';
import SearchBox from './elements/searchBox';
import { loadData, removeError, addError } from '../../actions';
import { kelvinToCelcius, formatTimestamp, checkGeolocation } from '../../helpers';

class Heading extends React.Component {
    constructor(props) {
        super(props);

        this.state = { city: '', errors: [] };
    }

    // check for 404 "city not found" error and add it to local state errors if found

    componentDidUpdate() {
        const errorText = 'City not found.';
        if (this.props.error && this.props.error.response.status === 404) {
            if (!this.state.errors.includes(errorText)) {
                const errors = [...this.state.errors, errorText];
                this.setState({ errors: errors });
            }
        } else {
            if (this.state.errors.includes(errorText)) {
                const errors = this.state.errors.filter(el => el !== errorText);
                this.setState({ errors: errors });
            }
        }
    }

    // remove 404 "city not found" error on unmount

    componentWillUnmount() {
        if (this.props.error) {
            this.props.removeError();
        }
    }

    searchAndRefreshHandler = (city = this.props.city) => {
        if (this.validateInputHandler(city)) {
            checkGeolocation(this.props.loadData, this.props.addError, this.props.type, city);
        }
    }

    cityInputHandler = (city) => {
        this.setState({ city: city })
    }

    validateInputHandler(input) {
        let errors = [];
        let formIsValid = true;

        if (input === '') {
            errors.push('Name cannot be empty.');
            formIsValid = false;
        }

        if (input.match(/\d/)) {
            errors.push('Must contain only letters.');
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        let iconbox = null;
        const { weather, main } = this.props.weather;
        const { cityName, country, type, updated } = this.props;

        if (this.props.type === 'current') {
            const icon_src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
            iconbox = <Iconbox src={icon_src} temp={kelvinToCelcius(main.temp)} />;
        }
        return (
            <div className="heading">
                <Basic
                    city={cityName}
                    country={country}
                    time={formatTimestamp(updated)}
                    text={type === 'current' ? 'Weather in:' : 'Forecast for:'}
                />
                {iconbox}
                <RefreshButton clicked={this.searchAndRefreshHandler} />
                <SearchBox
                    inputHandler={this.cityInputHandler}
                    city={this.state.city}
                    errors={this.state.errors}
                    submitHandler={this.searchAndRefreshHandler}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { weather: state.current, error: state.errors, city: state.city }
}

export default connect(mapStateToProps, {
    loadData,
    addError,
    removeError
})(Heading);

Heading.propTypes = {
    name: PropTypes.string,
    weather: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    loadData: PropTypes.func,
    error: PropTypes.object,
    city: PropTypes.string,
    type: PropTypes.string,
    country: PropTypes.string,
    cityName: PropTypes.string,
    updated: PropTypes.number,
    removeError: PropTypes.func,
    addError: PropTypes.func
};