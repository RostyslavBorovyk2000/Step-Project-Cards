const dragNdropFunction = () => {
  const visitList = document.getElementById('visitList');
  const cards = visitList.querySelectorAll('.card');
  const arrayFromCards = Array.from(cards);

  arrayFromCards.forEach((card, index) => {
    card.setAttribute('draggable', true)
    card.setAttribute('id', `item${index}`)

    function dragStart(event) {
      event.dataTransfer.setData('text', event.target.id);
      card.classList.add('highlight');
    }

    function dragOver(event) {
      event.preventDefault();
      card.classList.remove('highlight');
    }

    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragover', dragOver);
  });

  visitList.addEventListener('drop', (event) => {
    event.preventDefault();

    const id = event.dataTransfer.getData('text');
    const draggingElem = document.querySelector(`#${id}`);

    const dropElem = event.target.classList.contains('card') ? event.target : event.target.closest('.card');

    if (event.currentTarget === dropElem) {
      return;
    }

    const itemsArr = [...document.querySelectorAll('.card')];
    
    const dragIndex = itemsArr.indexOf(draggingElem);
    const dropIndex = itemsArr.indexOf(dropElem);

    if (dragIndex > dropIndex) {
      dropElem.before(draggingElem);
    } else {
      dropElem.after(draggingElem);
    }
  })

  visitList.addEventListener('dragenter', (event) => {
    event.preventDefault();
  })

  visitList.addEventListener('dragover', (event) => {
    event.preventDefault();
  })

  // 2 варіант при якому кнопки неклікабельні, але  картки переміщаються хаотично по дошці
  // arrayFromCards.forEach(card => {
  //     console.log(card)

  //     card.addEventListener('mousedown', (e) => {
  //       // e.preventDefault()
  //       // console.log(e.target)

  //       console.log(e.currentTarget)
  //       console.log(e.target)

  //       // if (e.target !== e.currentTarget) {
  //       //   return 
  //       // }

  //       console.log(e.currentTarget)
  //       console.log(e.target)

  //       e.currentTarget.style.position = 'absolute';

  //       moveAt(e);
  //       document.body.appendChild(card);
  //       card.style.zIndex = 100;

  //       function moveAt(e) {
  //         card.style.left = e.pageX - card.offsetWidth / 2 + 'px';
  //         card.style.top = e.pageY - card.offsetHeight / 2 + 'px';
  //       }

  //       document.onmousemove = function(e) {
  //         moveAt(e);
  //       }

  //       card.onmouseup = function() {
  //         document.onmousemove = null;
  //         card.onmouseup = null;
  //       }

  //       card.ondragstart = function() {
  //         return false;
  //       };
  //     })
  //   });

}

export default dragNdropFunction;


