globalThis.process ??= {}; globalThis.process.env ??= {};
/* empty css                                */
import { a as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DKgb3R87.mjs';
import { $ as $$Default } from '../chunks/Default_Dyr7wNyk.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Default, { "title": "home" }, { "default": ($$result2) => renderTemplate`
	${maybeRenderHead()}<h1 class="text-3xl">Sitemap SSR Test</h1>
	<ul class="list-disc m-4 ml-6">
		<li>
			<a href="/divisions/" class="underline">Divisions</a>		
		</li>
	</ul>	
` })}`;
}, "/Users/peterazuolas/development/testCase/src/pages/index.astro", void 0);

const $$file = "/Users/peterazuolas/development/testCase/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
