# Portafolio — Joel Nerio

## URL del portafolio publicado

https://portafolio-web-beta-bice.vercel.app 

---

## Reflexion

### Audiencia

Este portafolio esta dirigido a startups tecnicas B2B, especificamente aquellas que buscan desarrolladores capaces de construir y mantener aplicaciones web completas con enfasis en backend. Tengo en mente empresas cuyo producto es software que ayuda a negocios pequenos y medianos a automatizar procesos: facturacion, reservas, gestion de inventario, o comunicacion con clientes.

En si elegi esta audiencia porque es donde mas sentido tiene mi perfil, que me considero alguien que disfruta construir la logica detras del sistema, no solo la interfaz. Una empresa creativa buscaria portafolios mas visuales y orientados al diseno. Una empresa grande pediria experiencia con sistemas distribuidos a escala. Una startup tecnica busca exactamente lo que puedo y estoy mostrando que es a alguien que entiende el stack, toma decisiones, y puede construir cosas reales desde cero.

 Por lo que el diseno del portafolio se diseño de tal manera que pueda representar lo hablado con fondo oscuro, tipografia monoespaciada, lenguaje tecnico. En si no es un portafolio decorativo. Sino Es uno que le habla directamente al tipo de persona que lo va a evaluar.

### Tecnologias elegidas y por que

**Para construir el portafolio en si:**

- **React + Vite**: elegi React porque es la tecnologia de frontend mas relevante para el tipo de trabajo al que apunto, y Vite por su velocidad de desarrollo y su integracion nativa con el entorno  de JavaScript. Ahora bien no use un framework mas pesado como Next.js porque para un portafolio estatico no hay beneficio real en renderizado en el server(SSR) y tambien habria agregado complejidad innecesaria.
- **CSS en linea con variables CSS**: en lugar de usar un framework de componentes, opte por CSS en linea con variables CSS globales. Lo que me dio control total sobre el diseno sin dependencias externas, y el codigo de estilos vive junto al componente que lo usa.
- **Vercel**: el deploy mas directo para un proyecto React. Integracion nativa con GitHub, previews automaticos en cada push, y es exactamente lo que usaria en un proyecto real de startup.

**Tecnologias que muestro en los proyectos:**

- **Go**: el lenguaje que mas me llamo la atencion durante el curso por su enfoque en performance y simplicidad. 
- **SQLite**: lo use en el proyecto de Series Tracker por ser cero configuración para un proyecto de esa escala. El archivo de la base de datos vive junto al codigo y no requiere un servidor separado.
- **Railway + Vercel**: el stack de deploy para mis proyectos. Railway para el backend Go, Vercel para el frontend. Juntos cubren el ciclo completo de deploy sin necesitar administrar infraestructura.
- **Vitest + React Testing Library**: para el proyecto de la calculadora. se uso Vitest  como requisito pero tambien porque integra nativamente con Vite sin configuracion adicional, y React Testing Library para probar componentes desde la perspectiva del usuario.

### Tecnologia que decidí no usar y por que

Decidi **no incluir AWS, Azure ni GCP** como tecnologías centrales del portafolio. Ya que como habia mencionado en mi pitch estas son las tres plataformas de nube mas grandes del mundo, y en algun momento las mencione como posibles contenidos. Sin embargo, para la audiencia que elegí (startups pequenas y tecnicas), Vercel y Railway ofrecen el 80% del valor con el 20% de la complejidad operacional. Incluir AWS como tecnologia central habría entonces enviado un mensaje incorrecto sobre el contenido como por ejemplo que busco roles de DevOps o que necesito infraestructura empresarial, que no es lo que una startup en etapa temprana necesita en si  ni lo que quiero vender como mi diferenciador.

Por lo que esta fue una decision intencional.

### Donde me arriesgue y donde la jugue seguro

**Jugue seguro:**

- **React + Vite para el portafolio**: son las herramientas que mejor conozco del curso y la elección de alguna manera obvia para la audiencia técnica. No experimente con frameworks desconocidos para el portafolio en si porque el portafolio mas que nada es para mostrar los conocimientos.
- **El stack de proyectos existentes**: use los proyectos que ya habia construido durante el curso. No invente proyectos nuevos ni exagere sus alcances. Preferí mostrar trabajo real.

**Me arriesgue:**

- **El diseno oscuro y tecnico**: podia haber hecho un portafolio con gradientes de colores y animaciones modernas, pero  decidi ir por un estilo estético oscuro, lo cual siento que es un riesgo porque si no conecta con la persona puede que se vea frio o poco accesible. Pero si conecta con la audiencia tecnica correcta, se diferencia claramente de los demas.
- **Mostrar que soy estudiante**: en la seccion sobre mi digo directamente que soy un estudiante de Ciencias de la Computacion que quiere llegar a ser desarrollador web. En si podia haber ocultado eso, pero preferi ser transparente porque creo que para una startup técnica eso es más valioso que pretender tener experiencia que no tengo.
- **IntersectionObserver y scroll tracking manual**: en vez de una librería de animaciones, implemente el sistema de deteccion de secciones  y las animaciones de entrada desde cero. Es más trabajo pero el resultado es más liviano .

### Si tuviera otra semana, que mejoraria

1. **Mejorar el responsive en mobile**: el hero con foto circular se oculta en pantallas pequenas para simplificar.

2. **Auditoria de performance y accesibilidad**: Usando herramientas gratis  como Lighthouse me aseguraria de llegar a un score mayor a 95 en performance y accesibilidad. Funciona bien pero no lo he medido.

3. **Completar el proyecto de reservas**: durante el pitch del curso mencione la idea de construir un sistema de reservas para negocios pequeños. Ese proyecto sigue siendo una ambicion real. Tenerlo aunque sea como MVP funcionando habria sido el proyecto más representativo de lo que quiero hacer profesionalmente. No lo agregue porque siento que requiere mas tiempo y si lo hubiera hecho realmente solo seria por salir de paso y asi mejor no.

---

## Stack del portafolio

```
Frontend:  React 19 + Vite 8
Estilos:   CSS en linea con variables CSS globales
Fuentes:   Syne (display) + IBM Plex Mono (mono)
Deploy:    Vercel
```

## Como correr localmente

```bash
git clone https://github.com/joel55p/portafolio-web.git 
cd portafolio-web
cd mi-portafolio
npm install
npm run dev
```

## Repositorios de proyectos mostrados

- Chat en tiempo real: https://github.com/joel55p/Lab6-web
- Series Tracker backend: https://github.com/joel55p/web-backend
- Series Tracker frontend: https://github.com/joel55p/web-frontend
- Calculadora React: https://github.com/joel55p/project2-web