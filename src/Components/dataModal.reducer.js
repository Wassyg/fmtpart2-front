export default function(dataModal = {}, action) {
  if(action.type === 'openModal') {
    let dataModalCopy = {...action};
    console.log("dataModalCopy du reducer", dataModalCopy);
    return dataModalCopy;
  } else if (action.type === 'closeModal') { //provient de TattooModal
    let dataModalCopy2 = {...action}
    return dataModalCopy2;
  } else {
    return dataModal;
  }
  
}
