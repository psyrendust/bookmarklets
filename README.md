# My collection of bookmarklets

<!-- Do not edit below this line -->

## Copy GitHub PR Link

Creates a link to a GitHub PR that you can paste in an application like Slack.

The link is in the following format:

```handlebars
<a href='{{url-to-pr}}'>PR #{{pr-number}} - {{pr-title}}</a>
```

<details>
  <summary>Usage</summary>

1. Click the bookmarklet
2. The link will be created offscreen
3. The link will be copied to your clipboard
4. A System Notification will let you know that the link was copied
5. The notification will close after 5 seconds
6. Paste the formatted hyperlink in the application of your choice

</details>

### Bookmarklet Link

<details>
<summary>Tip</summary>

> [!TIP] Drag the bookmarklet link to your browsers bookmarks bar.

</details>

<a href='javascript:(()=>{let getDefault=(e,t)=>null!=e&&e!==t?e:t;function createEl(e,t,n,o){let l=document.createElement(e);o&&(l.textContent=o),l.style=getDefault(n,"");for(const[e,n]of Object.entries(getDefault(t,{})))l.setAttribute(e,n);return l}function run(){let e=window.location.href,t=document.querySelector("h1.gh-header-title"),[n,o]=t.querySelectorAll("*"),l=document.querySelector("#data-copy"),a=()=>{l&&t.removeChild(l)};a(),l=createEl("span",{id:"data-copy"},"opacity: 0; position:absolute; top:-1000px; left:0");let c=createEl("a",{href:e}),i=createEl("span",null,null,"PR "),r=createEl("span",null,null," - ");[i,o.cloneNode(!0),r,n.cloneNode(!0)].forEach((e=>c.appendChild(e))),t.appendChild(l),l.appendChild(c);var u=window.getSelection(),d=document.createRange();d.selectNodeContents(c),u.removeAllRanges(),u.addRange(d),document.execCommand("copy");let p=new Notification("GitHub Copy Link Complete");setTimeout((()=>{a(),p.close()}),5e3)}"granted"!==Notification.permission?Notification.requestPermission().then((e=>{"granted"===e&&run()})):run();})();'>Copy GitHub PR Link</a>
