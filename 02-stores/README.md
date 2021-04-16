# Stores
La comunicación entre componentes puede salirse de nuestras manos, por ende Svelte al igual que Vue y React cuenta con un sistema integrado.

Una tienda es simplemente un objeto con un método subscribe que permite notificar a las partes interesadas cuando cambia el valor de la tienda. 

- [Documentación oficial](https://svelte.dev/tutorial/writable-stores)

## store.js
```js
import { writable } from 'svelte/store'

export const count = writable(0)
```

## App.svelte
```html
<script>
	import { onDestroy } from 'svelte';
	import {count} from './stores'

	import Contador from './components/Contador.svelte'
	import Incrementar from './components/Incrementar.svelte'
	import Reset from './components/Reset.svelte'

	let count_value;

	const unsubscribe = count.subscribe(value => {
		count_value = value
	})

	onDestroy(unsubscribe);
</script>

<main class="container">
	<h1>Contador App: {count_value}</h1>
	<Contador />
	<Incrementar />
	<Reset />
</main>
```

## Contador.svelte
```html
<script>
    import {count} from '../stores'

</script>

<h2>Contador Components: {$count}</h2>
```

## Incrementar.svelte
```html
<script>
    import {count} from '../stores'

    const aumentar = () => {
        count.update(n => n + 1)
    }

</script>

<button on:click={aumentar}>Aumentar</button>
```

## Reset.svelte
```html
<script>
    import {count} from '../stores'

    const resetear = () => {
        count.set(1)
    }
    
</script>

<button on:click={resetear}>Reset</button>
```

## Writable stores
```js
import { writable } from 'svelte/store'

const createCount = () => {
    const { subscribe, set, update } = writable(0)
    
    return {
        subscribe,
        sumar: () => {
            update(n => n + 1)
        },
        restar: () => {
            update(n => n - 1)
        },
        reiniciar: () => {
            set(0)
        }
    }
    
}

export const count = createCount()
```

App.svelte
```html
<script>
	import { count } from './stores'	
</script>

<main class="container">
	<h1>Contador App: {$count}</h1>
	<button on:click={count.sumar}>sumar</button>
	<button on:click={count.restar}>restar</button>
	<button on:click={count.reiniciar}>reiniciar</button>
</main>
```

## Derived stores

```js
import { derived } from 'svelte/store'

export const maximo = derived(
    count,
    $count => {
        if ($count === 5) {
            return 'Llegaste al máximo'
        } else if ($count > 5) {
            count.reiniciar()
        } else {
            return 'Aun falta...'
        }
    }
)
```

App.svelte
```html
<script>
	import { count, maximo } from './stores'	
</script>

<main class="container">
	<h1>Contador App: {$count}</h1>
	<h2>{$maximo}</h2>
	<button on:click={count.sumar}>sumar</button>
	<button on:click={count.restar}>restar</button>
	<button on:click={count.reiniciar}>reiniciar</button>
</main>
```

## Crud Comp. y Store

- [Código](https://github.com/bluuweb/todo-svelte-youtube/tree/02-todo-componentes)

## Más...
Muchas gracias por llegar hasta acá 👍

Puedes apoyar estos tutoriales y al canal de bluuweb adquiriendo algún curso premium 🙌👌❤

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>Bootstrap 5!</b> aquí: [Acceder al curso aquí](http://curso-bootstrap-4-udemy.bluuweb.cl)
<b>Nos vemos en clases!</b>
:::

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>Vue.js y Firebase</b> aquí: [Acceder al curso aquí](http://curso-vue-js-udemy.bluuweb.cl)
<b>Nos vemos en clases!</b>
:::

::: tip CURSO EN UDEMY OFERTA!
Aprende desde cero a trabajar con <b>React.js y Firebase</b> aquí: [Acceder al curso aquí](http://curso-react-js-udemy.bluuweb.cl)
<b>Nos vemos en clases!</b>
:::


<img :src="$withBase('/img/trabajar.gif')">