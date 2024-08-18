globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DKgb3R87.mjs';
import { $ as $$Default } from '../chunks/Default_Dyr7wNyk.mjs';
import { r as request } from '../chunks/mlb_BgXd8bNw.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let data = await request({ type: "divisions" });
  console.log(data.divisions[0]);
  const breadCrumbs = [
    {
      path: "/divisions/",
      text: "Divisions"
    }
  ];
  const pageTitle = "Divisions";
  return renderTemplate`${renderComponent($$result, "Layout", $$Default, { "title": pageTitle, "breadCrumbs": breadCrumbs }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead()}<h1 class="text-3xl">Sitemap SSR Test</h1>

	<ul class="list-disc m-4 ml-6">
        ${data.divisions.map((item) => {
    return renderTemplate`<li>
                <a${addAttribute(`/divisions/${item.id}/`, "href")} class="underline">${item.name}</a>		
            </li>`;
  })}
	</ul>	
` })}`;
}, "/Users/peterazuolas/development/testCase/src/pages/divisions/index.astro", void 0);

const $$file = "/Users/peterazuolas/development/testCase/src/pages/divisions/index.astro";
const $$url = "/divisions/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
