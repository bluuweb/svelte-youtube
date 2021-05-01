module.exports = {
  title: 'Svelte (bluuweb - youtube)',
  description: 'Aprende a trabajar con Svelte!',
  base: '/svelte-youtube/',
  locales:{
    '/':{
      lang: 'es-ES'
    }
  },
  themeConfig:{
    nav: [
      { text: 'Guías', link: 'https://bluuweb.github.io/' },
      // { text: 'Guia', link: '/docs/' },
      { text: 'Youtube', link: 'https://youtube.com/bluuweb' },
      { text: 'Curso Vue 3', link: 'http://curso-vue-js-udemy.bluuweb.cl' },
      { text: 'Curso React', link: 'http://curso-react-js-udemy.bluuweb.cl' }
    ],
    sidebar:
      [
        '/',
        '/01-bases/',
        '/02-stores/',
        '/03-router/',
      ]
  }
 
}


{/* <img :src="$withBase('/img/compu-1.gif')"> */}