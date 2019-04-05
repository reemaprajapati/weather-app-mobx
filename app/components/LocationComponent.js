
import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ImageBackground} from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import moment from 'moment';

type Props = {};
@inject('store')
@observer
 class LocationComponent extends Component<Props> {
   @observable time = moment(new Date()).format('Do MMMM, h:mm')

    componentDidMount(){
      this.intervalID = setInterval(
        () => this.updateDate(),
        1000
      );
      
      navigator.geolocation.getCurrentPosition(
          (position) => {
              this.props.store.setLocation(position.coords.latitude, position.coords.longitude)
              this.props.store.loadWeather()
          },
          (error) => { console.log("location error", error)},
          { enableHighAccuracy: true, timeout: 3000}
      )
    }

    componentWillUnmount() {
      clearInterval(this.intervalID);
    }

    updateDate() {
      this.time =  moment(new Date()).format('Do MMMM, h:mm')
    }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground
            source={require('../assets/day_background.png')}
            style={styles.container}>
        {
          !this.props.store.loading ? 
          <View>
            <View >
              <Text style={styles.time}>{this.time}</Text>
              <View style={styles.location}>
              <Image source={require('../assets/ic_map.png')} style={{width: 16, height: 16, margin: 5}}/>
                <Text style={styles.locationText}>{this.props.store.weatherData.name}</Text>
              </View>
            </View>
            <View style={styles.main_content}>
              <Text style={styles.heading}>{this.props.store.weatherData.main.temp}°c</Text>
              <View style={styles.icon}>
                <Image source={{uri: `http://openweathermap.org/img/w/${this.props.store.weatherData.weather[0].icon}.png`}}
               style={{width: 80, height: 80}} />
                <Text style={styles.description}>{this.props.store.weatherData.weather[0].main}</Text>
              </View>
            </View>
            <View style={styles.details}>
              <Text style={styles.details}> Details</Text>
              <Text style={styles.description}> Pressure: {this.props.store.weatherData.main.pressure}</Text>
              <Text style={styles.description}> Humidity: {this.props.store.weatherData.main.humidity}</Text>
              <Text style={styles.description}> Min temperature: {this.props.store.weatherData.main.temp_min}</Text>
              <Text style={styles.description}> Max temperature: {this.props.store.weatherData.main.temp_max}</Text>
            </View>
          </View>
        :
         <ActivityIndicator style = {styles.activityIndicator} size = 'large' />
        } 
        </ImageBackground>
      </View>
    );
  }
}

export default LocationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'stretch',
  },
  heading: {
    fontSize: 65,
    color: '#fff',
    fontFamily: 'MerriweatherSans-Regular',
    marginLeft: 40
  },
  locationText: {
    marginLeft: 2,
    color: '#fff',
    fontSize: 20, 
    fontFamily: 'MerriweatherSans-Regular'
  },
  location: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 40,
  },
  description: {
    textAlign : 'center',
    justifyContent: 'center'
  },
  time:{
    fontSize:15,
    fontFamily: 'MerriweatherSans-Bold',
    color: '#000',
    marginTop: 50,
    marginLeft: 40
  },
  main_content:{
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center'

  },
  description:{
    fontSize: 12,
    fontFamily: 'MerriweatherSans-Regular',
    color: '#fff',
    textAlign: 'center'
  },
  activityIndicator:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  details:{
    marginLeft: 20,
    color: '#fff',
    marginTop: 20,
    fontFamily: 'MerriweatherSans-Bold',
    fontSize: 15,
    marginBottom: 5
  },
  description:{
    margin: 3,
    color: '#fff',
    fontFamily: 'MerriweatherSans-Regular',
    fontSize: 13,
    marginLeft: 20,
  },
});
