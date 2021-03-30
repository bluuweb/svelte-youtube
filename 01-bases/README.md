# Fundamentos
Guía práctica para seguir el curso de Svelte desde cero!

<img :src="$withBase('/img/svelte.png')">

- [https://svelte.dev/](https://svelte.dev/)

## Requisitos

- [HTML y CSS](https://www.youtube.com/watch?v=rr2H086z16s&list=PLPl81lqbj-4LKo66cEts5yC_AjOvqKptm)
- [Fundamentos de Javascript](https://www.youtube.com/watch?v=Z4TuS0HEJP8&list=PLPl81lqbj-4I2ZOzryjPKxfhK3BzTlaJ7)
- [DOM Javascript](https://www.youtube.com/watch?v=11MEBKljhFc&list=PLPl81lqbj-4I2ZOzryjPKxfhK3BzTlaJ7&index=3)
- [Más cursos aquí](https://bluuweb.github.io/)

## Extensiones VSC

- [beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
- [dobri theme](https://marketplace.visualstudio.com/items?itemName=sldobri.bunker)
- [svelte-vscode](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)

## ¿Qué es Svelte?

- [https://svelte.dev/](https://svelte.dev/)
- [blog](https://svelte.dev/blog/svelte-3-rethinking-reactivity)
- Framework basado en componentes.
- Sin virtual DOM, Svelte compila el código en un vanilla JS diminuto, cuando construyes tu aplicación.
- Reactivo. [Leer](https://svelte.dev/blog/svelte-3-rethinking-reactivity)
- Menos código.
- Explicado por Oscar Barajas [ver video aquí](https://www.youtube.com/watch?v=YyF_9Tg0DcE)

Svelte se ejecuta en el momento de la compilación , convirtiendo sus componentes en un código imperativo altamente eficiente que actualiza quirúrgicamente el DOM. Como resultado, puede escribir aplicaciones ambiciosas con excelentes características de rendimiento.

## A jugar!

Tener instalado:
- [https://nodejs.org/es/](https://nodejs.org/es/)
- [Curso de node.js](https://www.youtube.com/watch?v=mG4U9t5nWG8&list=PLPl81lqbj-4IEnmCXEJeEXPepr8gWtsl6)

```
npx degit sveltejs/template my-svelte-project
 
cd my-svelte-project

npm install
npm run dev
```

- También puedes descargar cualquier ejemplo de: [https://svelte.dev/examples](https://svelte.dev/examples#hello-world)

## Reactividad
```html
<script>
	export let name;
	let counter = 0;
	const aumentar = () => {
		counter ++
	}
</script>

<main>
	<h1>Hello {name}!</h1>
	<h2>Counter: {counter}</h2>
	<button on:click={aumentar}>Aumentar</button>
</main>

<style>
	h1 {
		color: peru;
	}
</style>
```

## Próximante...
Estamos trabando para usted: <br>
<img :src="$withBase('/img/trabajar.gif')">
