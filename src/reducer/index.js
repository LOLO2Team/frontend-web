const initialState = {
  parkingLots: [],
  parkingBoys: [],
  rolesList: [],
  role: '',
  token: '',
  authorized: false,
  selectedEmployeeId: 0,
  parkingBoysForAsso: [],
  parkingLotsForAsso: [],
  myRole: [],
  orders: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case "SET_TOKEN": {
      return {
        ...state,
        token: payload
      }
    }

    case "SET_MY_ROLE": {
      return {
        ...state,
        myRole: payload
      }
    }

    case "SET_ORDERS": {
      const orders = payload.map(order => {
        const parkingLot = state.parkingLots.find(lot => {
          if (lot.parkingLotId === order.parkingLotId) {
            return lot;
          }
        });
        const parkingLotName = parkingLot == null ? null : parkingLot.parkingLotName;

        return {
          orderId: order.orderId,
          vehicleNumber: order.vehicleNumber,
          parkingLotId: order.parkingLotId,
          parkingLotName: parkingLotName,
          employeeId: order.employeeId,
          orderStatus: order.orderStatus
        }
      })
      return {
        ...state,
        orders: orders
      }
    }

    case "SET_PARKING_LOTS": {
      const parkingLots = payload.map((lot, index) => {
        return {
          key: index,
            parkedCount: lot.parkedCount,
          parkingLotId: lot.parkingLotId,
          parkingLotName: lot.parkingLotName,
          capacity: lot.capacity,
          reservedSpace: lot.reservedSpace,
          employeeId: lot.employeeId,
            status: lot.parkingLotStatus
        }
      })
      if (JSON.stringify(parkingLots) === JSON.stringify(state.parkingLots)) {
        return state;
      }
      return {
        ...state,
        parkingLots
      }
    }

    case "ASSO_PAGE_GET_ALL_PARKING_LOTS": {
      const parkingLotsForAsso = payload.map((lot, index) => {
        return {
          key: index,
          title: lot.parkingLotName,
          description: String(lot.parkingLotId)
        }
      });
      
      if (JSON.stringify(parkingLotsForAsso) === JSON.stringify(state.parkingLotsForAsso)) {
        return state;
      }
      return {
        ...state,
        parkingLotsForAsso: parkingLotsForAsso
      }
    }

    case "ASSO_PAGE_MAP_LOT_KEY": {
      const parkingBoysForAsso = state.parkingBoys.map((boy) => {
        let parkingLots = boy.parkingLots
        if (parkingLots == null) {
          parkingLots = [];
        }
        const parkingLotIds = parkingLots.map(lot => {
          return lot.parkingLotId
        });

        const parkingLotKeys =
          state.parkingLotsForAsso
            .filter(lot => {
              if (parkingLotIds.includes(parseInt(lot.description))) {
                return String(lot.key)
              }
            }).map(lot => {
              return parseInt(lot.key)
            });
        return {
          ...boy,
          parkingLotKeys: parkingLotKeys

        }
      });
      if (JSON.stringify(parkingBoysForAsso) === JSON.stringify(state.parkingBoysForAsso)) {
        return state;
      }
      return {
        ...state,
        parkingBoysForAsso: parkingBoysForAsso
          
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
            rolesList: boy.rolesList,
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

    case "SET_ROLE" : {
      return{
        ...state,
        rolesList:payload,
        role:payload[0]
      }
    }

    case "SELECT_EMPLOYEE": {
      return {
        ...state,
        selectedEmployeeId: payload
      }
    }

    default:
      return state
  }
}