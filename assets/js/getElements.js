// Functions creating list elements start
function getFavouriteListElement(title, id) {
  return `
      <li id='favourite-item-${id}' class='collection-item col m4 l12 favourite-item' onclick='onClickFavoriteItem("${id}")'>
        <span class='title col s10'>
          ${title}
        </span>
        <a  href='#!' class='secondary-content col s2 remove-action' onclick='onRemoveFacourite("${id}", event)'>
          <i class='material-icons'>clear</i>
        </a>
      </li>
      `;
}

function getTopListElement(elementData, index, isActive) {
  var activeClass = "";
  if (isActive) activeClass = " active-favourite-action";
  return `
      <li class='top-list-item' onclick='onClickTopItem(${index})'>
        <div class='collapsible-header top-list-item-header waves-effect waves-teal'>
          <div>
            <span class='top-number'>
              ${index + 1}
            </span>
            <img src='${
              elementData.imgUrl
            }' alt='' width='40' height='40' class='circle'/>
            <div class='top-list-item-title-box'>
              <span class='title'>
                ${elementData.title}
              </span>
              <p>
                ${elementData.channelTitle}
              </p>
            </div>
            <a 
              href='#!' 
              id='add-favourite-${index}' 
              class='secondary-content add-favourite-action${activeClass}'
              onclick='onAddFacourite(${index}, event)'>
              <i class='material-icons'>favorite</i>
            </a>
          </div>
        </div>
        <pre class='collapsible-body white-text description'>
          ${elementData.description}
        </pre>
      </li>
      `;
}

