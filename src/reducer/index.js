const initialState = {
  parkingLots: [],
  parkingBoys: [],
  myRole: "manager",
  token: '',
  authorized: false

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case "SET_TOKEN": {
      return {
        ...state,
        token: payload
      }
    }

    case "SET_PARKING_LOTS": {
      return {
        ...state,
        parkingLots: payload.map((lot, index) => {
          return {
            key: index,
            parkingLotId: lot.parkingLotId,
            parkingLotName: lot.parkingLotName,
            capacity: lot.capacity,
            reservedSpace: lot.reservedSpace,
            employeeId: lot.employeeId
          }
        })
      }
    }

    case "POST_PARKING_LOTS": {
      return {
        ...state,
        parkingLots: state.parkingLots.concat(payload)
      }
    }

    case "SET_PARKING_BOYS": {
      return {
        ...state,
        parkingBoys: payload.map((boy, index) => {
          return {
            key: index,
            employeeId: boy.employeeId,
            name: boy.name,
            username: boy.username,
            email: boy.email,
            phone: boy.phone,
            role: boy.role
          }
        })
      }
    }

    case "SWITCH_MY_ROLE": {
      return {
        ...state,
        myRole: payload
      }
    }

    case "SET_AUTHORIZED": {
      return {
        ...state,
        authorized: true
      }
    }

    default:
      return state
  }
}