export default {
    getAll: (token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'GET'
        })

    },
    getAllParkingBoy: (token, dispatch) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: "SET_PARKING_BOYS",
                    payload: res
                });
            })

    },
    deleteEmployee: (id, token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys/" + id + "/status/FROZEN", {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'PUT'
        })
    },
    editEmployee: (id, status, token) => {
        console.log("api")
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys/" + id + "/status/" + status, {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'PUT'
        })
            .then(res => console.log(res))
    },
    createBoy: (value, token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            body: JSON.stringify({
                "name": value.name,
                "username": value.username,
                "password": value.password,
                "phone": value.phone,
                "email": value.email
                // "role": role
            }),
            mode: 'cors',
            method: 'POST'
        })
    }

}