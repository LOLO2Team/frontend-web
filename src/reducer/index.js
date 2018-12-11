const initialState = {
  parkingLots: []

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

    case "POST_PARKING_LOTS":{
      return {
        ...state,
        parkingLots: state.parkingLots.concat(payload)
      }
    }

    default:
      return state
  }
}