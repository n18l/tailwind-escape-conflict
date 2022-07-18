# Tailwind escape character collisions within JavaScript contexts

This project, bootstrapped with [Create React App](https://github.com/facebook/create-react-app), demonstrates the following issue.

Tailwind's method of [escaping underscores within arbitrary values](https://tailwindcss.com/docs/content#using-spaces-and-underscores) conflicts with JavaScript when Tailwind classes are applied in a JavaScript context. For example, when using Tailwind classes in JSX as part of a ternary expression, or as a function argument for the popular [classnames](https://www.npmjs.com/package/classnames) library.

## Plain String, single escaped

JSX source:

```jsx
<span className='before:font-symbols before:content-["expand\_more"]' />
```

&check; The generated HTML class is as expected.

```html
<span class="before:font-symbols before:content-[&quot;expand\_more&quot;]"></span>
```

&check; The generated CSS rule is as expected.

```css
.before\:content-\[\"expand\\_more\"\]::before {
  --tw-content: "expand_more";
  content: var(--tw-content);
}
```

## JavaScript String, single escaped

JSX source (note that this runs afoul of my ESLint/Prettier config, YMMV):

```jsx
/* eslint-disable no-useless-escape, prettier/prettier */
<span className={'before:font-symbols before:content-["expand\_more"]'} />
```

&cross; Because of the JS context, the slash has been removed from the HTML class.

```html
<span class="before:font-symbols before:content-[&quot;expand_more&quot;]"></span>
```

&check; The generated CSS rule is as expected, but of course it now doesn't match our slash-less HTML class.

```css
.before\:content-\[\"expand\\_more\"\]::before {
  --tw-content: "expand_more";
  content: var(--tw-content);
}
```

## JavaScript string, double escaped

JSX source:

```jsx
<span className={'before:font-symbols before:content-["expand\\_more"]'} />
```

&check; The generated HTML class is now as expected since we escaped our escape character.

```html
<span class="before:font-symbols before:content-[&quot;expand\_more&quot;]"></span>
```

&cross; However, the generated CSS rule now incorporates the extra slashes, so it doesn't match the HTML class.

```css
.before\:content-\[\"expand\\\\_more\"\]::before {
  --tw-content: "expand\_more";
  content: var(--tw-content);
}
```
