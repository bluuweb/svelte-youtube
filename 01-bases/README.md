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

:::warning OJO 👀
Tener instalado:

- [https://git-scm.com/](https://git-scm.com/)
- [https://nodejs.org/es/](https://nodejs.org/es/)
- [Curso de node.js](https://www.youtube.com/watch?v=mG4U9t5nWG8&list=PLPl81lqbj-4IEnmCXEJeEXPepr8gWtsl6)
  :::

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
    contador++;
  };
</script>

<main>
  <h1>Hello {name}!</h1>
  <h2>Counter: {contador}</h2>
  <button on:click="{aumentar}">Aumentar</button>
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
  let colorText = "text-primary";

  const aumentar = () => {
    contador++;
    if (contador >= 10) {
      colorText = "text-danger";
    }
  };
</script>

<main class="container text-center mt-5">
  <h1 class="{colorText}">Counter: {contador}</h1>
  <button class="btn btn-primary my-5" on:click="{aumentar}">Aumentar</button>
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
$: doble = contador * 2;
```

Svelte interpreta como "volver a ejecutar este código, siempre que cambie alguno de los valores referenciados"

Así podemos pintar:

```html
<h3>El doble es: {doble}</h3>
```

Otro ejemplo:

```js
$: advertencia = contador < 10 ? "es menor a 10" : "es mayor o igual a 10";
```

```html
<h3>{contador < 10 ? 'es menor a 10' : 'es mayor o igual a 10'}</h3>
<h3>{advertencia}</h3>
```

## $: if

```js
let colorText = "text-primary";

$: if (contador >= 10) {
  colorText = "text-danger";
}
```

## Bucles

```html
<script>
  let cursos = ["html", "css", "js"];
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
- Debido a que la reactividad de Svelte se activa mediante asignaciones, el uso de métodos de matriz como `push` no generará actualizaciones automáticamente.
- [Actualizar matrices](https://svelte.dev/tutorial/updating-arrays-and-objects)

```html
<script>
  let cursos = ["html", "css", "js"];

  let numeros = [1, 10, 2];

  const agregar = () => {
    let num = Math.floor(Math.random() * (20 - 1) + 1);
    console.log(num);
    // numeros.push(num)
    numeros = [...numeros, num];
  };
</script>

<main class="container mt-5">
  <h1>condicionales y bucles</h1>

  <ul>
    {#each cursos as curso, index}
    <li>{index} - {curso}</li>
    {/each}
  </ul>

  <button on:click="{agregar}">Agregar</button>
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
  let cursos = ["html", "css", "js"];

  let numeros = [1, 10, 2];

  const agregar = () => {
    let num = Math.floor(Math.random() * (20 - 1) + 1);
    numeros = [...numeros, num];
  };
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
  <button on:click="{agregar}">Agregar</button>
  {/if}

  <ul>
    {#each numeros as numero}
    <li>{numero}</li>
    {/each}
  </ul>
</main>
```

## Bindings

```html
<script>
  let texto = "";
  let numero = 0;
  let rango = 5;
  let seleccion = true;

  let opciones = ["pizza", "sandia", "sushi"];
  let radio = "";
  let arraySeleccion = [];

  $: console.log(arraySeleccion);
</script>

<div>
  <h1>Bindings</h1>

  <input type="text" bind:value="{texto}" />

  <input type="number" bind:value="{numero}" />

  <input type="range" bind:value="{rango}" min="0" max="10" />

  <input type="checkbox" bind:checked="{seleccion}" />

  <h4>Texto: {texto}</h4>
  <h4>numero: {numero}</h4>
  <h4>rango: {rango}</h4>
  <h4>seleccion: {seleccion}</h4>

  {#each opciones as item}
  <input type="radio" bind:group="{radio}" value="{item}" />
  {item} {/each}

  <h4>radio: {radio}</h4>

  {#each opciones as item}
  <input type="checkbox" bind:group="{arraySeleccion}" value="{item}" />
  {item} {/each}

  <h4>arraySeleccion: {arraySeleccion}</h4>
</div>
```

## CRUD

- [Tema VSC](https://marketplace.visualstudio.com/items?itemName=dbanksdesign.nu-disco)
- [Bracket](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [tabnine-vscode](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)
- [Bootstrap 5](https://getbootstrap.com/)

Crear Proyectos Svelte
```
npx degit sveltejs/template todo-svelte-youtube
```

Bootstrap 5

```
npm install bootstrap@next
```

main.js

```js
import App from "./App.svelte";

import "bootstrap/dist/css/bootstrap.min.css";

const app = new App({
  target: document.body,
});

export default app;
```

public/global.css

```css
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css");
```

## addTodo

```js
let todos = [];
let todo = { id: "", texto: "", estado: false };

const addTodos = () => {
  if (!todo.texto.trim()) {
    console.log("texto vacio");
    todo.texto = "";
    return;
  }
  todo.id = Date.now();
  todos = [...todos, todo];
  todo = { id: "", texto: "", estado: false };
};
```

```html
<h1 class="my-3 display-6">TODO</h1>
<form on:submit|preventDefault="{addTodos}">
  <input
    type="text"
    class="form-control shadow border-0"
    bind:value="{todo.texto}"
    placeholder="Enter para agregar tarea"
  />
</form>
```

## ReadTodo

```PHP Template
{#each todos as item}
	<div class="shadow my-3 p-3 lead">
		<p class={item.estado ? "text-decoration-line-through" : ""}>
			{item.texto}
		</p>
		<button class={classEstado(item.estado)} on:click={updateTodos(item.id)}>
			<i class={classIcono(item.estado)} />
		</button>
		<button class="btn btn-sm btn-danger" on:click={delTodos(item.id)}>
			<i class="bi bi-trash" />
		</button>
	</div>
{/each}
```

```js
$: classEstado = (valor) =>
  valor ? "btn btn-sm btn-success" : "btn btn-sm btn-warning";
$: classIcono = (valor) => (valor ? "bi bi-arrow-clockwise" : "bi bi-check2");
```

## delTodo

```js
const delTodos = (id) => {
  todos = todos.filter((item) => item.id !== id);
};
```

## updateTodo

```js
const updateTodos = (id) => {
  todos = todos.map((item) =>
    item.id === id ? { ...item, estado: !item.estado } : item
  );
};
```

## LocalStorage

```js
let todos = [];
let todo = { id: "", texto: "", estado: false };

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}

$: localStorage.setItem("todos", JSON.stringify(todos));
```

## Toast Bootstrap

- [#using-bootstrap-as-a-module](https://getbootstrap.com/docs/5.0/getting-started/javascript/#using-bootstrap-as-a-module)
- [Color Toast](https://getbootstrap.com/docs/5.0/components/toasts/#color-schemes)

```html
<div
  class="toast align-items-center text-white bg-primary border-0"
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  <div class="d-flex">
    <div class="toast-body">Hello, world! This is a toast message.</div>
    <button
      type="button"
      class="btn-close btn-close-white me-2 m-auto"
      data-bs-dismiss="toast"
      aria-label="Close"
    ></button>
  </div>
</div>
```

Envolver en:

```html
<div class="toast-container position-absolute top-0 end-0 p-3">...toast</div>
```

```js
import { Toast } from "bootstrap";

let toastEl;
let opc = { text: "", color: "" };
const mostrarMensaje = (text, color) => {
  opc = {
    text: text,
    color: color,
  };
  new Toast(toastEl).show();
};
```

```html{3-4,10}
<div class="toast-container position-absolute top-0 end-0 p-3">
  <div
    bind:this="{toastEl}"
    class="toast align-items-center text-white bg-{opc.color}"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">{opc.text}</div>
      <button
        type="button"
        class="btn-close me-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</div>
```

En cada acción:

```js{3}
const delTodos = (id) => {
  todos = todos.filter((item) => item.id !== id);
  mostrarMensaje("Todo eliminado", "danger");
};
```

## Deploy
```
npm run build
```

Arrastrar carpeta public a:
- [https://app.netlify.com/](https://app.netlify.com/)

## Próximante... Componentes
Estamos trabando para usted: <br>
<img :src="$withBase('/img/trabajar.gif')">
