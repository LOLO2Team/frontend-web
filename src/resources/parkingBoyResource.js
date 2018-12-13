export default {
    getAll: (token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/employees?type=parkingBoysDetail", {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'GET'
        })

    },
    getAllEmployees: (token) => {
        return fetch("https://parking-lot-backend.herokuapp.com/employees", {
            //getInitData: fetch("http://localhost:8081/orders", {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            mode: 'cors',
            method: 'GET'
        })
    },
    // getAllParkingBoy: (token, dispatch) => {
    //     return fetch("https://parking-lot-backend.herokuapp.com/parkingboys", {
    //         //getInitData: fetch("http://localhost:8081/orders", {
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': token
    //         }),
    //         mode: 'cors',
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             dispatch({
    //                 type: "SET_PARKING_BOYS",
    //                 payload: res
    //             });
    //         })

    // },
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
    editEmployeeRole:(id, role, token) => {
        console.log("api")
        return fetch("https://parking-lot-backend.herokuapp.com/employees/"+id+"/roles/"+role, {
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
                "email": value.email,
                "authorities":
                    [
                        {
                            "name": "ROLE_PARKING_CLERK"
                        }
                    ]
            }),
            mode: 'cors',
            method: 'POST'
        })
    }

}