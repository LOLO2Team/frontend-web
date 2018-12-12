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
    deleteEmployee: (id, token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys/" + id +"/status/FROZEN" , {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'PUT'
        })
    },
    inviteEmployee: (id, token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys/" + id +"/status/WORKING" , {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'PUT'
        })
    },
    createBoy: (value,token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            body: JSON.stringify({
                "name": value.name,
                "username": value.username,
                "password":value.password,
                "phone": value.phone,
                "email": value.email
                // "role": role
              }),
            mode: 'cors',
            method: 'POST'
        })
    }
}