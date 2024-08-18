globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                   */
import { c as createAstro, a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_DKgb3R87.mjs';
import { $ as $$Default } from '../../chunks/Default_Dyr7wNyk.mjs';
import { r as request } from '../../chunks/mlb_BgXd8bNw.mjs';
export { renderers } from '../../renderers.mjs';

function sitemap(context, cb) {
          globalThis[Symbol.for('@inox-tools/aik-route-config')]?.get('sitemap-ext:config')?.(context, cb);
        }

const $$Astro = createAstro("https://mlbdemo.com");

await sitemap({
  bundleFile: import.meta.url,
  sourceFile: "/Users/peterazuolas/development/testCase/src/pages/divisions/[id].astro"
}, async ({ addToSitemap }) => {
  await request({ type: "divisions" });
  addToSitemap(
    data.divisions.map((post) => {
      console.log(post);
      return {
        id: post.id
      };
    })
  );
});
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let data = await request({ type: "divisions", "id": id });
  data = data["divisions"][0];
  let league = (await request({ type: "league", "id": data["league"]["id"] }))["leagues"][0];
  console.log(data, league);
  const breadCrumbs = [
    {
      path: "/divisions/",
      text: "Divisions"
    },
    {
      path: `/divisions/${id}/`,
      text: data.name
    }
  ];
  const pageTitle = `Divisions - ${data.name}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Default, { "title": pageTitle, "breadCrumbs": breadCrumbs }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead()}<h1 class="text-3xl">${data.name}</h1>

	<ul class="list-disc m-4 ml-6">
        ${Object.keys(data).map((key) => {
    return renderTemplate`<li>${key} = ${typeof (data[key] !== "object") ? data[key] : "object"}</li>`;
  })}
	</ul>	
	<h1 class="text-3xl">${league.name}</h1>
	<ul class="list-disc m-4 ml-6">
        ${Object.keys(league).map((key) => {
    return renderTemplate`<li>${key} = ${typeof (league[key] !== "object") ? league[key] : "object"}</li>`;
  })}
	</ul>	
` })}`;
}, "/Users/peterazuolas/development/testCase/src/pages/divisions/[id].astro", void 0);

const $$file = "/Users/peterazuolas/development/testCase/src/pages/divisions/[id].astro";
const $$url = "/divisions/[id]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        default: $$id,
        file: $$file,
        url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
