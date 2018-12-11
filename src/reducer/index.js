const initialState = {
  parkingLots: [],
  parkingBoys: []

}

export default (state = initialState, { type, payload }) => {
  switch (type) {

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
            name: boy.name,
            username: boy.username,
            email: boy.email,
            phone: boy.phone,
            role: boy.role
          }
        })
      }
    }

    default:
      return state
  }
}