let getDefault = (item, value) =>
  item != null && item !== value ? item : value;

function createEl(type, attributes, style, content) {
  let el = document.createElement(type);
  if (content) el.textContent = content;
  el.style = getDefault(style, '');
  for (const [key, value] of Object.entries(getDefault(attributes, {}))) {
    el.setAttribute(key, value);
  }
  return el;
}
function run() {
  console.log('running program');
  let url = window.location.href;
  let titleContainer = document.querySelector('h1.gh-header-title');
  let [titleNode, numNode] = titleContainer.querySelectorAll('*');
  let anchorContainer = document.querySelector('#data-copy');

  let removeAnchorContainer = () => {
    if (anchorContainer) {
      console.log('removing previous anchorContainer');
      titleContainer.removeChild(anchorContainer);
    }
  };
  removeAnchorContainer();
  anchorContainer = createEl(
    'span',
    { id: 'data-copy' },
    'opacity: 0; position:absolute; top:-1000px; left:0',
  );
  let anchor = createEl('a', { href: url });
  let prNode = createEl('span', null, null, 'PR ');
  let sepNode = createEl('span', null, null, ' - ');
  [prNode, numNode.cloneNode(true), sepNode, titleNode.cloneNode(true)].forEach(
    (node) => anchor.appendChild(node),
  );

  titleContainer.appendChild(anchorContainer);
  anchorContainer.appendChild(anchor);
  console.log('anchor added to dom');

  console.log('create selection');
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(anchor);
  selection.removeAllRanges();
  selection.addRange(range);
  //add to clipboard.
  document.execCommand('copy');
  console.log('selection copied');
  console.log('send notification');

  let notify = new Notification('GitHub Copy Link Complete');
  console.log('wait to close notification');
  setTimeout(() => {
    removeAnchorContainer();
    console.log('close notification');
    notify.close();
    console.groupEnd();
  }, 5000);
}

console.group('[GITHUB-COPY-LINK]');
if (Notification.permission !== 'granted') {
  console.log('Notification request permission');
  Notification.requestPermission().then((permission) => {
    console.log('Notification request permission status', permission);
    if (permission === 'granted') {
      run();
    }
  });
} else {
  run();
}
