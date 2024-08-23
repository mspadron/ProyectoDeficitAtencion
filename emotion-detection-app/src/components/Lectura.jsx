import React from 'react'
import imageArbol from '../assets/images/arbol.jpg';

const LecturaComponent = ({onComplete}) => {
  return (
    <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">EL ÁRBOL GENEROSO</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-600 mb-6">POR SHEL SILVERSTEIN</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="mb-4">Había una vez un árbol… Que amaba a un pequeño niño.</p>
            <p className="mb-4">Y todos los días el niño venía Y recogía sus hojas Para hacerse con ellas una corona y jugar al rey del bosque. Subía por su tronco Y se mecía en sus ramas Y comía manzanas Y ambos jugaban al escondite. Y cuando estaba cansado, dormía bajo su sombra Y el niño amaba al árbol mucho Y el árbol era feliz.</p>
            <p className="mb-4">Pero el tiempo pasó Y el niño creció Y el árbol se quedaba a menudo solo.</p>
            <p className="mb-4">Pero un día, el árbol vio venir a su niño y le dijo: “Ven, Niño. Súbete a mi tronco y mécete en mis ramas y come mis manzanas y juega bajo mi sombra y sé feliz.”</p>
            <p className="mb-4">“Ya soy muy grande para trepar y jugar,” dijo el niño. “Yo quiero comprar cosas y divertirme, necesito dinero. ¿Podrías dármelo?”</p>
            <p className="mb-4">“Lo siento,” dijo el árbol, “pero yo no tengo dinero. Sólo tengo hojas y manzanas. Coge mis manzanas y véndelas en la ciudad. Así, tendrás dinero y serás feliz.”</p>
            <img src={imageArbol} alt="" />
            <p className="mb-4">Y, así, él se subió al árbol, recogió las manzanas y se las llevó. Y el árbol se sintió feliz.</p>
            <p className="mb-4">Pero pasó mucho tiempo y su niño no volvía. Y el árbol estaba triste.</p>
            <p className="mb-4">Y entonces, un día regresó y el árbol se agitó alegremente y le dijo, “Ven, Niño, súbete a mi tronco, mécete en mis ramas y sé feliz.”</p>
            <p className="mb-4">“Estoy muy ocupado para trepar a árboles,” dijo él. “Necesito una casa que me sirva de abrigo. Quiero una esposa y unos niños, y por eso quiero una casa. ¿Puedes tú dármela?"</p>
            <p className="mb-4">“Yo no tengo casa,” dijo el árbol. “El bosque es mi hogar, pero tú puedes cortar mis ramas y hacerte una casa. Entonces serás feliz.”</p>
            <p className="mb-4">Y así él cortó sus ramas y se las llevó para construir su casa. Y el árbol se sintió feliz…</p>
            <p className="mb-4">Pero pasó mucho tiempo y su niño no volvía. Y cuando regresó, el árbol estaba tan feliz que apenas pudo hablar.</p>
            <p className="mb-4">“Ven, Niño”, susurró. “Ven y juega.”</p>
            <p className="mb-4">“Estoy muy viejo y triste para jugar”, dijo él “Quiero un bote que me lleve lejos de aquí. ¿Puedes tú dármelo?”</p>
            <p className="mb-4">“Corta mi tronco y hazte un bote,” dijo el árbol. “Entonces podrás navegar lejos…y serás feliz.”</p>
            <p className="mb-4">Y así él cortó el tronco Y se hizo un bote y navegó lejos. Y el árbol se sintió feliz. Pero no realmente.</p>
            <p className="mb-4">Y después de mucho tiempo, su niño volvió nuevamente. “Lo siento, Niño,” dijo el árbol, “pero ya no tengo nada para darte ya no me quedan manzanas.”</p>
            <p className="mb-4">“Mis dientes son muy débiles para comer manzanas”, le contestó el niño.</p>
            <p className="mb-4">“Ya no me quedan ramas, tú ya no puedes mecerte en ellas”, dijo el árbol.</p>
            <p className="mb-4">“Estoy muy viejo para columpiarme en las ramas,” dijo el niño.</p>
            <p className="mb-4">“Ya no tengo tronco,” dijo el árbol, “tú ya no puedes trepar.”</p>
            <p className="mb-4">“Estoy muy cansado para trepar,” le contestó el niño.</p>
            <p className="mb-4">“Quisiera poder darte algo…pero ya no me queda nada. Soy sólo un viejo tocón. Lo siento…” (dijo el árbol)</p>
            <p className="mb-4">“Yo no necesito mucho ahora, sólo un lugar tranquilo para reposar, estoy muy cansado,” dijo el niño.</p>
            <p className="mb-4">“Bien,” dijo el árbol reanimándose, “un viejo tocón es bueno para sentarse y descansar. Ven, Niño, siéntate. Siéntate y descansa.”</p>
            <p className="mb-4">Y él se sentó. Y el árbol fue feliz.</p>
        </div>
        {/*Terminar lectura*/}
        <div className='text-center justify-center items-center'>
        <button onClick={onComplete} className='font-bold mt-4  py-2 px-4 rounded bg-green-500 hover:bg-green-600 text-white'>Terminar lectura</button>
        </div>
        
    </div>
  )
}

export default LecturaComponent