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

<a href='javascript:(()=>{let getDefault=(e,t)=>null!=e&&e!==t?e:t;function createEl(e,t,n,l){let o=document.createElement(e);l&&(o.textContent=l),o.style=getDefault(n,"");for(const[e,n]of Object.entries(getDefault(t,{})))o.setAttribute(e,n);return o}function run(){let e=window.location.href,t=document.querySelector("h1.gh-header-title")??document.querySelector('[data-component="PH_Title"]'),[n,l]=t.querySelectorAll("\*"),o=document.querySelector("#data-copy"),a=()=>{o&&t.removeChild(o)};a(),o=createEl("span",{id:"data-copy"},"opacity: 0; position:absolute; top:-1000px; left:0");let c=createEl("div",null,null),r=createEl("span",null,null,":pr: "),i=createEl("a",{href:e}),d=createEl("span",null,null,"PR "),u=createEl("span",null,null," - ");[d,l.cloneNode(!0),u,n.cloneNode(!0)].forEach((e=>i.appendChild(e))),t.appendChild(o),o.appendChild(c),c.appendChild(r),c.appendChild(i);var p=window.getSelection(),s=document.createRange();s.selectNodeContents(c),p.removeAllRanges(),p.addRange(s),document.execCommand("copy");let m=new Notification("GitHub Copy Link Complete");setTimeout((()=>{a(),m.close()}),5e3)}"granted"!==Notification.permission?Notification.requestPermission().then((e=>{"granted"===e&&run()})):run();})();'>Copy GitHub PR Link</a>
