# Router

- [svelte-routing](https://github.com/EmilTholin/svelte-routing)

## Repo

- [01 Router](https://github.com/bluuweb/svelte-router/tree/01-router)
- [02 Router + Firebase Auth](https://github.com/bluuweb/svelte-router/tree/02-firebase)

## Instalación
Ejecute dentro de su proyecto:
```
npm install --save svelte-routing
```

## Router, Link, Route 

App.svelte
```js
import { Router, Link, Route } from "svelte-routing";
import Home from './views/Home.svelte'
import Login from './views/Login.svelte'
import Perfil from './views/Perfil.svelte'
```

```html
<div>
	<h1>App</h1>
	<Router>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/login">Login</Link>
			<Link to="/perfil">Perfil</Link>
		</nav>

		<Route path="/">
			<Home></Home>
		</Route>
		<Route path="/login">
			<Login></Login>
		</Route>
		<Route path="/perfil">
			<Perfil></Perfil>
		</Route>
	</Router>
</div>
```

## SPA
```json
"scripts": {
    "start": "sirv public --no-clear -s"
},
```

## stores/user

```js
import { writable } from 'svelte/store'

const createUser = () => {
    const { subscribe, set } = writable(null)

    return {
        subscribe,
        setUser: (user) => {
            set(user)
        }
    }
}

export const user = createUser()
```

## Login.svelte
```html
<script>
    import {user} from '../stores/user'

    let email = '', password = '';

    const procesarFormulario = () => {
        if(!email.trim() || !password.trim()){
            console.log('campos vacios')
            return
        }

        user.setUser({
            displayName: email,
            uid: Date.now()
        })

        email = ''
        password = ''

        console.log($user)
    }
</script>

<div>
    <h1>Login</h1>
    <form on:submit|preventDefault={procesarFormulario}>
        <input 
            type="text"
            placeholder="Email"
            bind:value={email}
        >
        <input 
            type="text"
            placeholder="Password"
            bind:value={password}
        >
        <button type="submit">Acceder</button>
    </form>
</div>
```

## navigate
```js
import { navigate } from "svelte-routing";

const procesarFormulario = () => { 
    ...
    navigate('/perfil', { replace: true })
}
```

## Ruta Protegida

Perfil.svelte
```html
<script>
    import {user} from '../stores/user'
    import { navigate } from "svelte-routing";
    import {onMount} from 'svelte'

    
    onMount(() => {
        if(!$user){
            navigate('/', { replace: true })
        }
    })
    
</script>

<div>
    {#if $user}
         <h1>Perfil (ruta protegida)</h1>
    {/if}
</div>
```

## Navbar
```html
<script>
    import {  Link, navigate } from "svelte-routing";
    import {user} from '../stores/user'

    const cerrarSesion = () => {
        user.setUser(null)
        navigate('/', { replace: true })
    }
</script>

<nav>
    {#if $user}
        <Link to="/perfil">Perfil</Link>
        <button on:click={cerrarSesion}>Cerrar Sesión</button>
    {:else}
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
    {/if}
</nav>
```

## Firebase

- [google-signin](https://firebase.google.com/docs/auth/web/google-signin?authuser=0)
- [onAuthStateChanged](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
- [Promise auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#onauthstatechanged)

```js
import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

// onAuthStateChanged: el observador solo se activa al iniciar o cerrar sesión
firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            resolve(user);
        }, reject);
    });
};

export {provider, auth, firebase}
```

### user.js
```js
import { writable } from 'svelte/store'
import {firebase} from '../firebase'

const createUser = () => {
    const { subscribe, set } = writable(false)

    return {
        subscribe,
        setUser: (user) => {
            set(user)
        },
        current: async () => {
            const user = await firebase.getCurrentUser()
            set(user)
        }
    }
}

export const user = createUser()
```

### Login.svelte
```html
<script>
    import {user} from '../stores/User'
    import {navigate} from 'svelte-routing'
    import {auth, provider} from '../firebase'
    
    const procesarFormulario = async() => {
        try {
            const res = await auth.signInWithPopup(provider)
            console.log(res)
            user.setUser(res.user)
            navigate('/perfil', {replace: true})
        } catch (error) {
           console.log(error) 
        }   

    }
</script>

<div>
    <h1>Acceso</h1>
    <button 
        type="submit" 
        on:click={procesarFormulario}
    >Acceder con Google</button>
</div>
```

### Cerrar Sesión
Navbar.svelte
```html
<script>
    import {Link, navigate} from 'svelte-routing'
    import {user} from '../stores/User'
    import {auth} from '../firebase'

    const cerrarSesion = async() => {
        try {
            await auth.signOut()
            user.setUser(null)
            navigate('/login', {replace: true})
            
        } catch (error) {
            console.log(error)
        }
    }
</script>

<nav>
    {#if $user}
        <Link to="/perfil">PERFIL</Link>
        <button on:click={cerrarSesion}>Cerrar Sesión</button>
    {:else}
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/login">LOGIN</Link>
    {/if}
</nav>
```

### App.svelte
```html
<script>
	import { Router, Route } from "svelte-routing";
	import Home from './views/Home.svelte'
	import Login from './views/Login.svelte'
	import Perfil from './views/Perfil.svelte'
	import Navbar from './components/Navbar.svelte'

	import {onMount} from 'svelte'
	import {user} from './stores/user'

	onMount(async() => {
		await user.current()
	})
</script>

{#if $user === false}
	<h1>Cargando...</h1>
{:else}
	<div>
		<h1>App</h1>
		<Router>
			<Navbar />

			<Route path="/">
				<Home></Home>
			</Route>
			<Route path="/login">
				<Login></Login>
			</Route>
			<Route path="/perfil">
				<Perfil></Perfil>
			</Route>
		</Router>
	</div>
{/if}

<style>
	h1 {
		color: rgb(47, 103, 153);
	}
</style>
```

### Perfil.svelte
```html
<script>
    import { user } from '../stores/user'
    import { navigate } from "svelte-routing";
    import {onMount} from 'svelte'
    
    onMount(async () => {
        if(!$user){
            navigate('/', { replace: true })
        }
    })
</script>

<div>
    {#if $user}
        <h1>Perfil (ruta protegida)</h1>
        <p>{$user.displayName} - {$user.email}</p>
    {/if}
</div>
```

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
