const initialState = {
  parkingLots: [],
  parkingBoys: [],
  myRole: "manager",
  token: '',
  authorized: false,
  selectedEmployeeId: 0,
  parkingBoysForAsso: [],
  parkingLotsForAsso: []
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
            status: lot.parkingLotStatus
          }
        })
      }
    }

    case "ASSO_PAGE_GET_ALL_PARKING_LOTS": {
      return {
        ...state,
        parkingLotsForAsso: payload.map((lot, index) => {
          return {
            key: index,
            title: lot.parkingLotName,
            description: String(lot.parkingLotId)
          }
        })
      }
    }

    case "ASSO_PAGE_MAP_LOT_KEY": {
      return {
        ...state,
        parkingBoysForAsso:
          state.parkingBoys.map((boy) => {
            const parkingLotIds = boy.parkingLots.map(lot => {
              return lot.parkingLotId
            });
            // console.log(Object.keys(
            //   state.parkingLotsForAsso
            //     .filter(lot => {
            //       if (parkingLotIds.includes(parseInt(lot.description))) {
            //         return parseInt(lot.key, 10)
            //       }
            //     })
            // ).map(key => {
            //   return parseInt(key)
            // }))
            const parkingLotKeys = 
            Object.keys(
              state.parkingLotsForAsso
                .filter(lot => {
                  if (parkingLotIds.includes(parseInt(lot.description))) {
                    return lot.key
                  }
                })).map(key => {
                  return parseInt(key)
                });
            return {
              ...boy,
              parkingLotKeys: parkingLotKeys
                
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
            role: boy.role,
            status: boy.status,
            parkingLots: boy.parkingLotResponses
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

    case "SELECT_EMPLOYEE":{
      return{
        ...state,
        selectedEmployeeId: payload
      }
    }

    default:
      return state
  }
}