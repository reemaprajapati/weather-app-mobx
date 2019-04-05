
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
            style={styles.container}s>
        {
          !this.props.store.loading ? 
          <View>
            <View >
              <Text style={styles.time}>{this.time}</Text>
              <Text style={styles.location}>{this.props.store.weatherData.name}</Text>
            </View>
            <View style={styles.main_content}>
              <Text style={styles.heading}>{this.props.store.weatherData.main.temp}°c</Text>
              <View style={styles.icon}>
                <Image source={{uri: `http://openweathermap.org/img/w/${this.props.store.weatherData.weather[0].icon}.png`}}
               style={{width: 80, height: 80}} />
                <Text style={styles.description}>{this.props.store.weatherData.weather[0].main}</Text>
              </View>
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
    fontSize: 60,
    color: '#fff',
    fontFamily: 'MerriweatherSans-Regular',
    marginLeft: 40
  },
  location: {
    color: '#fff',
    fontSize: 20, 
    marginTop: 20,
    marginLeft: 40,
    fontFamily: 'MerriweatherSans-Regular'
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
  },
  description:{
    fontSize: 12,
    fontFamily: 'MerriweatherSans-Regular',
    color: '#fff'
  },
  activityIndicator:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
