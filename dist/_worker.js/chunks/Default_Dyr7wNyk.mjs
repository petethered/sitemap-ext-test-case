globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createAstro, a as createComponent, r as renderTemplate, d as addAttribute, m as maybeRenderHead, b as renderComponent, e as renderHead, f as renderSlot } from './astro/server_DKgb3R87.mjs';
/* empty css                        */

const $$Astro$2 = createAstro("https://mlbdemo.com");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`
<meta name="astro-view-transitions-enabled" content="true">
<meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>
`;
}, "/Users/peterazuolas/development/testCase/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$1 = createAstro("https://mlbdemo.com");
const $$ReplacementSwap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ReplacementSwap;
  const { rootAttributesToPreserve = "" } = Astro2.props;
  return renderTemplate`<meta name="vtbot-replace-swap"${addAttribute(rootAttributesToPreserve, "content")}>
`;
}, "/Users/peterazuolas/development/testCase/node_modules/astro-vtbot/components/ReplacementSwap.astro", void 0);

const $$Astro = createAstro("https://mlbdemo.com");
const $$Default = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Default;
  let { title, breadCrumbs = [] } = Astro2.props;
  let homeLink = "/";
  const breadCrumbsMobile = breadCrumbs.filter((item, index) => {
    if (index < 1) {
      return item;
    }
    if (index >= breadCrumbs.length - 1) {
      return item;
    }
  });
  title = "MLB Test - " + title;
  return renderTemplate`<html lang="en" data-astro-cid-jwirc66j>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#000000">
    <link rel="preload" href="https://fonts.googleapis.com/css?family=Noto%20Sans:300,400,500,600,700,900" as="style" onload="this.onload=null;this.rel='stylesheet'">
    ${maybeRenderHead()}<noscript>
      <link href="https://fonts.googleapis.com/css?family=Noto%20Sans:300,400,500,600,700,900" rel="stylesheet" type="text/css">
    </noscript>
    <link rel="canonical"${addAttribute("https://mlbtest.com" + Astro2.url.pathname, "href")}>
    <link rel="sitemap" href="/sitemap-index.xml">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta name="description" content="MLBTest">
    <title>${title}</title>
     

         ${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "data-astro-cid-jwirc66j": true })}
         ${renderComponent($$result, "ReplacementSwap", $$ReplacementSwap, { "data-astro-cid-jwirc66j": true })}
     ${renderHead()}</head>
     <body class="" data-astro-cid-jwirc66j>
      <div class="outer" data-vtbot-replace="main" data-astro-cid-jwirc66j>
        <div class="container mx-auto py-4" data-astro-cid-jwirc66j>

          ${renderTemplate`<div${addAttribute("container " + (""), "class")} data-astro-cid-jwirc66j>
            <div class="relative w-full  pb-10" data-astro-cid-jwirc66j>
            <div class="text-sm breadcrumbs p-0 m-0 pb-0 absolute left-0 top-[50%] -translate-y-1/2 hidden md:block" data-astro-cid-jwirc66j>
              <ul data-astro-cid-jwirc66j>
                <li data-astro-cid-jwirc66j><a${addAttribute(homeLink, "href")} class="text-xs" data-astro-cid-jwirc66j>Home</a></li> 
                ${breadCrumbs.map((item, index) => {
    let classString = "";
    return renderTemplate`<li${addAttribute(classString, "class")} data-astro-cid-jwirc66j>
                      <a${addAttribute(item.path, "href")} class="text-xs"${addAttribute(!item?.id ? item.text.replaceAll(/\W/g, "_") + Date.now() : `${item.id}`, "id")} data-astro-cid-jwirc66j>${item.text}</a>
                    </li>`;
  })}
              </ul>
            </div>       
            <div class="text-sm breadcrumbs p-0 m-0 pb-0 absolute left-0 top-[50%] -translate-y-1/2 block md:hidden" data-astro-cid-jwirc66j>
              <ul data-astro-cid-jwirc66j>
                <li data-astro-cid-jwirc66j><a href="/" class="text-xs" data-astro-cid-jwirc66j>Home</a></li> 
                ${breadCrumbsMobile.map((item, index) => {
    let classString = "";
    return renderTemplate`<li${addAttribute(classString, "class")} data-astro-cid-jwirc66j>
                        <a${addAttribute(item.path, "href")} class="text-xs"${addAttribute(!item?.id ? item.text.replaceAll(/\W/g, "_") + Date.now() : `${item.id}`, "id")} data-astro-cid-jwirc66j>${item.text}</a>
                      </li>`;
  })}
              </ul>
            </div>                       
          </div>
        </div>`}

          ${renderSlot($$result, $$slots["default"])}
        </div>
      </div>          
  </body></html>`;
}, "/Users/peterazuolas/development/testCase/src/layouts/Default.astro", void 0);

export { $$Default as $ };
