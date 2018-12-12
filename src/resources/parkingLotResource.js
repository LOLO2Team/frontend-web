export default {
    toggleLot: (id, token, status) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkinglots/" + id + "/status/" + status, {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'PUT'
            })
    }
}