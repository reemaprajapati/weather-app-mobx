import { observable, runInAction, flow } from 'mobx';

class LocationStore {
    @observable latitude = null
    @observable longitude = null
    @observable weatherData = {}
    @observable loading = true
    @observable error = ''

    setLocation(lat, long){
        this.latitude = lat
        this.longitude = long
    }

    fetchWeather = flow(function * () {
       return fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&APPID=f63461facabaf1c19240cdb2cf810b38`);
    })

    loadWeather = flow(function * () {
        try{  
            const response = yield this.fetchWeather()
            const data = yield response.json();
            runInAction(() => {
                console.log(data)
                this.weatherData = data;
                this.loading = false;
            });
        }catch(error){
            runInAction(()=> {
                this.loading = false
                this.error = error
            })
        }
     })
}

const locationStore = new LocationStore
export default locationStore;

