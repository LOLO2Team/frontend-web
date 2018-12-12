const initialState = {
  parkingLots: [],
  parkingBoys: [],
  myRole: "manager",
  token: '',
  authorized: false,
  parkingLotsForAsso: [],
  parkingLotsByEmployeeForAsso: []
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
            employeeId: lot.employeeId,
            status: lot.status
          }
        })
      }
    }

    case "ASSO_PAGE_GET_PARKING_LOTS": {
      return {
        ...state,
        parkingLotsForAsso: payload.map((lot, index) => {
          return {
            key: index,
            title: lot.parkingLotName,
            description: lot.parkingLotId
          }
        })
      }
    }

    case "GET_PARKING_LOTS_BY_EMPLOYEE": {
      const employeeParkingLotIds = payload.map(lot => { 
        return lot.parkingLotId;
      });

      const parkingLotsByEmployeeForAsso = state.parkingLotsForAsso.filter((lot) => 
        employeeParkingLotIds.includes(parseInt(lot.description)))
        .map(lot => {
        return lot.key;
      });

      return {
        ...state,
        parkingLotsByEmployeeForAsso: parkingLotsByEmployeeForAsso
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
            status: boy.status,
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