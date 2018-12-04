export default function(dataModal = {}, action) {
  if(action.type === 'openModal') {
    let dataModalCopy = {...action}
    return dataModalCopy;
  } else if (action.type === 'closeModal') {
    let dataModalCopy2 = {...action}
    return dataModalCopy2;
  } else {
    return dataModal;
  }

}
