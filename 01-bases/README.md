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
	let contador = 0;
	const aumentar = () => {
		contador ++
	}
</script>

<main>
	<h1>Hello {name}!</h1>
	<h2>Counter: {contador}</h2>
	<button on:click={aumentar}>Aumentar</button>
</main>

<style>
	h1 {
		color: peru;
	}
</style>
```

## Llaves
Las llaves nos permiten escribir expresiones JS con Svelte y también podemos utilizarlas como atributos dinámicos:

```html
<h3>{contador < 10 ? 'es menor a 10' : 'es mayor o igual a 10'}</h3>
<h3>El doble es: {contador * 2}</h3>
```

```html
<script>
	let contador = 0;
	let colorText = 'text-primary';

	const aumentar = () => {
		contador ++
		if(contador >= 10){
			colorText = 'text-danger'
		}
	}

</script>

<main class="container text-center mt-5">
	<h1 class={colorText}>Counter: {contador}</h1>
	<button class="btn btn-primary my-5" on:click={aumentar}>Aumentar</button>
	<h3>{contador < 10 ? 'es menor a 10' : 'es mayor o igual a 10'}</h3>
	<h3>El doble es: {contador * 2}</h3>
</main>
```

## $: Declaraciones Reactivas 
- [reactive-declarations](https://svelte.dev/examples#reactive-declarations)
- [tutorial/reactive-declarations](https://svelte.dev/tutorial/reactive-declarations)

```js
// declaraciones reactivas 
// Parecido a las propiedades calculadas o computed en vue.js
$: doble = contador * 2
```
Svelte interpreta como "volver a ejecutar este código, siempre que cambie alguno de los valores referenciados"

Así podemos pintar:

```html
<h3>El doble es: {doble}</h3>
```

Otro ejemplo:
```js
$: advertencia = contador < 10 ? 'es menor a 10' : 'es mayor o igual a 10'
```
```html
<h3>{contador < 10 ? 'es menor a 10' : 'es mayor o igual a 10'}</h3>
<h3>{advertencia}</h3>
```

## $: if
```js
let colorText = 'text-primary'
	
$: if(contador >=10){
	colorText = 'text-danger'
} 
```

## Bucles
```html
<script>
	
	let cursos = ['html', 'css', 'js']

</script>

<main>
	<h1>condicionales y bucles</h1>
	
	<ul>
		{#each cursos as curso, index}
		<li>{index} - {curso}</li>
		{/each}
	</ul>

</main>
```

- [Número Random](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/random#example_using_math.random)
- Debido a que la reactividad de Svelte se activa mediante asignaciones, el uso de métodos de matriz como ``push`` no generará actualizaciones automáticamente.
- [Actualizar matrices](https://svelte.dev/tutorial/updating-arrays-and-objects)

```html
<script>
	
	let cursos = ['html', 'css', 'js']

	let numeros = [1, 10, 2]

	const agregar = () => {
		let num = Math.floor(Math.random() * (20 - 1) + 1)
		console.log(num)
		// numeros.push(num)
		numeros = [...numeros, num]
	}

</script>

<main class="container mt-5">
	<h1>condicionales y bucles</h1>
	
	<ul>
		{#each cursos as curso, index}
		<li>{index} - {curso}</li>
		{/each}
	</ul>

	<button on:click={agregar}>Agregar</button>
	<ul>
		{#each numeros as numero}
			 <li>{numero}</li>
		{/each}
	</ul>
	
</main>
```

## Condicionales
```html
<script>
	
	let cursos = ['html', 'css', 'js']

	let numeros = [1, 10, 2]

	const agregar = () => {
		let num = Math.floor(Math.random() * (20 - 1) + 1)
		numeros = [...numeros, num]
	}

</script>

<main class="container mt-5">
	<h1>condicionales y bucles</h1>
	
	<ul>
		{#each cursos as curso, index}
		<li>{index} - {curso}</li>
		{/each}
	</ul>

	{#if numeros.length > 5}
		<h3>Agregaste más de 5 números!</h3>
	{:else}
		<button on:click={agregar}>Agregar</button>
	{/if}

	<ul>
		{#each numeros as numero}
			 <li>{numero}</li>
		{/each}
	</ul>
	
</main>
```


## Próximante...
Estamos trabando para usted: <br>
<img :src="$withBase('/img/trabajar.gif')">
